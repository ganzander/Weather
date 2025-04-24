"use client";

import { useEffect, useState } from 'react';
import { Cloud, Droplets, Wind, Compass, Sun, Thermometer, Umbrella, CloudRain, CloudSnow, CloudLightning, Moon, CloudFog, CloudDrizzle, CloudHail, CloudSun as SunBehindCloud, Snowflake } from 'lucide-react';
import { 
  formatTemperature, 
  getWeatherColors, 
  formatWind,
  getWeatherDescription
} from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function WeatherCard({ weatherData, className }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  if (!weatherData || !weatherData.current) {
    return (
      <div className={cn(
        "rounded-xl p-6 animate-pulse",
        "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900",
        "shadow-lg text-center min-h-[220px] flex items-center justify-center",
        className
      )}>
        <div className="space-y-4 w-full">
          <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
          <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  const { current, location } = weatherData;
  const { 
    temp_c, temp_f, condition, wind_kph, wind_dir, 
    humidity, precip_mm, feelslike_c, uv, is_day 
  } = current;
  
  const { bgGradient, textColor } = getWeatherColors(condition.code, is_day);
  
  // Map of weather icons based on condition
  const WeatherIcon = () => {
    const iconMap = {
      '1000': is_day ? Sun : Moon,  // Clear
      '1003': SunBehindCloud,  // Partly cloudy
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
    
    const IconComponent = iconMap[condition.code] || Cloud;
    return <IconComponent className="h-20 w-20" />;
  };
  
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        bgGradient,
        textColor,
        "transition-all duration-500 shadow-lg",
        "backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{location.name}</h2>
            <p className="opacity-90">{location.region}, {location.country}</p>
          </div>
          <div className="flex items-center">
            <WeatherIcon />
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <div className="text-5xl font-bold tracking-tighter">
              {formatTemperature(temp_c)}
            </div>
            <div className="text-right">
              <div className="text-lg font-medium">
                {condition.text}
              </div>
              <div>
                Feels like {formatTemperature(feelslike_c)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 opacity-80" />
            <span>{formatWind(wind_kph, wind_dir)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 opacity-80" />
            <span>{humidity}% humidity</span>
          </div>
          <div className="flex items-center gap-2">
            <Umbrella className="h-5 w-5 opacity-80" />
            <span>{precip_mm} mm</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 opacity-80" />
            <span>UV: {uv}</span>
          </div>
        </div>
      </div>
    </div>
  );
}