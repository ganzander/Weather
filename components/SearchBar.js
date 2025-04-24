"use client";

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchLocations } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function SearchBar({ onLocationSelect, apiKey }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const locations = await searchLocations(query, apiKey);
        setResults(locations || []);
      } catch (error) {
        console.error('Error searching locations:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, apiKey]);

  const handleLocationSelect = (location) => {
    setQuery(location.name);
    setResults([]);
    setIsFocused(false);
    onLocationSelect(location);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <div className={cn(
        "flex items-center rounded-lg border transition-all duration-300",
        "bg-white/10 backdrop-blur-lg shadow-lg",
        "hover:bg-white/20 focus-within:ring-2 focus-within:ring-primary/50",
        isFocused ? "ring-2 ring-primary/50" : ""
      )}>
        <Search 
          className="h-5 w-5 ml-3 text-foreground opacity-70" 
          aria-hidden="true" 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search location..."
          className={cn(
            "flex-1 bg-transparent p-3 outline-none",
            "placeholder:text-foreground/50 text-foreground"
          )}
          aria-label="Search for a location"
        />
        {isLoading && (
          <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-foreground/30 border-t-foreground"></div>
        )}
      </div>

      {isFocused && results.length > 0 && (
        <ul className={cn(
          "absolute z-10 mt-1 w-full rounded-md border",
          "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md",
          "shadow-lg max-h-60 overflow-auto",
          "animate-in fade-in-50 slide-in-from-top-5 duration-200"
        )}>
          {results.map((location) => (
            <li 
              key={`${location.id}-${location.name}`}
              className={cn(
                "p-3 cursor-pointer",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                "transition-colors duration-150 ease-in-out"
              )}
              onClick={() => handleLocationSelect(location)}
            >
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {location.region && `${location.region}, `}{location.country}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}