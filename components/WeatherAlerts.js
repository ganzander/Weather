"use client";

import { useState, useEffect } from 'react';
import { AlertTriangle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WeatherAlerts({ alerts, className }) {
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showAlerts, setShowAlerts] = useState(true);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  if (!alerts || !alerts.alert || alerts.alert.length === 0) return null;
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const closeAlerts = () => {
    setShowAlerts(false);
  };
  
  // Get severity class
  const getSeverityClass = (severity) => {
    const severityMap = {
      'Minor': 'bg-yellow-600/90 text-white',
      'Moderate': 'bg-orange-600/90 text-white',
      'Severe': 'bg-red-600/90 text-white',
      'Extreme': 'bg-red-700/90 text-white',
    };
    
    return severityMap[severity] || 'bg-yellow-600/90 text-white';
  };
  
  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (!showAlerts) return null;
  
  return (
    <div className={cn(
      "rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out",
      expanded ? "max-h-96" : "max-h-20",
      className
    )}>
      {alerts.alert.map((alert, index) => (
        <div 
          key={index}
          className={cn(
            "p-4 relative",
            getSeverityClass(alert.severity || 'Moderate')
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">{alert.headline || 'Weather Alert'}</div>
                {expanded && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">{alert.desc}</p>
                    <div className="text-xs opacity-90">
                      <span>Effective: {formatDate(alert.effective)}</span>
                      <span className="mx-2">•</span>
                      <span>Expires: {formatDate(alert.expires)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleExpanded}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label={expanded ? 'Show less' : 'Show more'}
              >
                {expanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={closeAlerts}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close alert"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}