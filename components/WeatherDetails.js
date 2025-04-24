"use client";

import { useEffect, useState } from 'react';
import { 
  Wind, Compass, Droplets, Sun, Umbrella, Gauge,
  Eye, CloudRain, Thermometer, Clock, Sunrise, Sunset
} from 'lucide-react';
import { cn, formatAirQuality } from '@/lib/utils';

export default function WeatherDetails({ weatherData, className }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  if (!weatherData || !weatherData.current) return null;
  
  const { current, forecast } = weatherData;
  const {
    wind_kph,
    wind_dir,
    humidity,
    precip_mm,
    feelslike_c,
    uv,
    vis_km,
    pressure_mb,
    gust_kph,
    air_quality,
  } = current;
  
  // Format the air quality data
  const airQuality = formatAirQuality(air_quality);
  
  // Get sunrise/sunset times
  let sunrise = '';
  let sunset = '';
  
  if (forecast && forecast.forecastday && forecast.forecastday.length > 0) {
    sunrise = forecast.forecastday[0].astro.sunrise;
    sunset = forecast.forecastday[0].astro.sunset;
  }
  
  const detailItems = [
    {
      label: 'Feels Like',
      value: `${Math.round(feelslike_c)}°C`,
      icon: Thermometer,
    },
    {
      label: 'Wind Speed',
      value: `${Math.round(wind_kph)} km/h`,
      icon: Wind,
    },
    {
      label: 'Wind Direction',
      value: wind_dir,
      icon: Compass,
    },
    {
      label: 'Wind Gust',
      value: `${Math.round(gust_kph)} km/h`,
      icon: Wind,
    },
    {
      label: 'Humidity',
      value: `${humidity}%`,
      icon: Droplets,
    },
    {
      label: 'UV Index',
      value: uv,
      icon: Sun,
    },
    {
      label: 'Precipitation',
      value: `${precip_mm} mm`,
      icon: CloudRain,
    },
    {
      label: 'Visibility',
      value: `${vis_km} km`,
      icon: Eye,
    },
    {
      label: 'Pressure',
      value: `${pressure_mb} mb`,
      icon: Gauge,
    },
    {
      label: 'Sunrise',
      value: sunrise,
      icon: Sunrise,
    },
    {
      label: 'Sunset',
      value: sunset,
      icon: Sunset,
    },
  ];
  
  return (
    <div className={cn("w-full", className)}>
      <h3 className="text-lg font-medium mb-3">Weather Details</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Air Quality Card (full width) */}
        <div className={cn(
          "col-span-2 sm:col-span-3 md:col-span-4 p-4 rounded-lg",
          "bg-gradient-to-r",
          airQuality.color === 'green' && "from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30",
          airQuality.color === 'yellow' && "from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30",
          airQuality.color === 'orange' && "from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30",
          airQuality.color === 'red' && "from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30",
          airQuality.color === 'purple' && "from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30",
          airQuality.color === 'maroon' && "from-red-200 to-red-300 dark:from-red-950/30 dark:to-red-900/30",
          airQuality.color === 'gray' && "from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/30",
        )}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Air Quality</h4>
              <p className="text-sm opacity-80">US EPA Standard</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium">{airQuality.level}</div>
              <div className="text-sm opacity-80">Index: {airQuality.value}</div>
            </div>
          </div>
        </div>
        
        {/* Weather Detail Cards */}
        {detailItems.map((item, index) => (
          <div 
            key={index}
            className="bg-card/50 p-3 rounded-lg flex flex-col"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
            <div className="mt-1 text-lg font-medium">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}