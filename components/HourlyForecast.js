"use client";

import { useEffect, useState, useRef } from 'react';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, Sun, Moon, CloudFog, Snowflake, CloudSun, CloudHail } from 'lucide-react';
import { cn, formatTemperature } from '@/lib/utils';

export default function HourlyForecast({ forecast, className }) {
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef(null);
  
  useEffect(() => {
    setMounted(true);
    
    // Scroll to current hour
    if (scrollContainerRef.current) {
      const now = new Date();
      const currentHour = now.getHours();
      const hourElements = scrollContainerRef.current.querySelectorAll('.hour-item');
      
      hourElements.forEach((element, index) => {
        const hour = parseInt(element.getAttribute('data-hour'), 10);
        if (hour === currentHour) {
          const scrollPosition = element.offsetLeft - 100; // Center it
          scrollContainerRef.current.scrollLeft = scrollPosition;
        }
      });
    }
  }, [forecast]);
  
  if (!mounted) return null;
  if (!forecast || !forecast.hour || forecast.hour.length === 0) return null;
  
  // Get the current hour to highlight it
  const now = new Date();
  const currentHour = now.getHours();
  
  // Map of weather icons based on condition
  const getWeatherIcon = (code, isDay) => {
    // Create a map of components instead of accessing them dynamically
    const iconComponents = {
      '1000': isDay ? Sun : Moon,  // Clear
      '1003': CloudSun,  // Partly cloudy
      '1006': Cloud,  // Cloudy
      '1009': Cloud,  // Overcast
      '1030': CloudFog,  // Mist
      '1063': CloudDrizzle,  // Patchy rain
      '1066': CloudSnow,  // Patchy snow
      '1087': CloudLightning,  // Thundery outbreaks
      '1114': Snowflake,  // Blowing snow
      '1117': Snowflake,  // Blizzard
      '1135': CloudFog,  // Fog
      '1147': CloudFog,  // Freezing fog
      '1150': CloudDrizzle,  // Patchy light drizzle
      '1153': CloudDrizzle,  // Light drizzle
      '1180': CloudDrizzle,  // Patchy light rain
      '1183': CloudDrizzle,  // Light rain
      '1186': CloudRain,  // Moderate rain at times
      '1189': CloudRain,  // Moderate rain
      '1192': CloudRain,  // Heavy rain at times
      '1195': CloudRain,  // Heavy rain
      '1204': CloudSnow,  // Light sleet
      '1207': CloudSnow,  // Moderate or heavy sleet
      '1210': CloudSnow,  // Patchy light snow
      '1213': CloudSnow,  // Light snow
      '1216': CloudSnow,  // Patchy moderate snow
      '1219': CloudSnow,  // Moderate snow
      '1222': CloudSnow,  // Patchy heavy snow
      '1225': CloudSnow,  // Heavy snow
      '1237': CloudHail,  // Ice pellets
      '1240': CloudDrizzle,  // Light rain shower
      '1243': CloudRain,  // Moderate or heavy rain shower
      '1246': CloudRain,  // Torrential rain shower
      '1273': CloudLightning,  // Patchy light rain with thunder
      '1276': CloudLightning,  // Moderate or heavy rain with thunder
      '1279': CloudLightning,  // Patchy light snow with thunder
      '1282': CloudLightning,  // Moderate or heavy snow with thunder
    };
    
    const IconComponent = iconComponents[code] || Cloud;
    return <IconComponent className="h-6 w-6" />;
  };
  
  // Format hour from date string
  const formatHour = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  // Get hour from date string (24-hour format)
  const getHour = (dateStr) => {
    const date = new Date(dateStr);
    return date.getHours();
  };
  
  return (
    <div className={cn("w-full", className)}>
      <h3 className="text-lg font-medium mb-3">Hourly Forecast</h3>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {forecast.hour.map((hour, index) => {
          const hourNum = getHour(hour.time);
          const isCurrentHour = hourNum === currentHour;
          
          return (
            <div 
              key={index}
              data-hour={hourNum}
              className={cn(
                "hour-item flex-shrink-0 flex flex-col items-center p-3 rounded-lg min-w-[80px]",
                "transition-all duration-200 ease-in-out",
                isCurrentHour ? 
                  "bg-primary/15 dark:bg-primary/25 ring-2 ring-primary/30" : 
                  "bg-card/50 hover:bg-card/80"
              )}
            >
              <div className="text-sm font-medium">{formatHour(hour.time)}</div>
              <div className="my-2">
                {getWeatherIcon(hour.condition.code, hour.is_day)}
              </div>
              <div className="font-bold">{formatTemperature(hour.temp_c)}</div>
              <div className="text-xs mt-1 opacity-70">{hour.chance_of_rain}% rain</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}