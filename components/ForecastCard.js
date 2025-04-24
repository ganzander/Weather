"use client";

import { useEffect, useState } from 'react';
import { formatDate, formatTemperature, cn } from '@/lib/utils';
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, Thermometer, Sun, Moon, CloudFog, Snowflake, Umbrella, CloudSun as SunBehindCloud, CloudHail } from 'lucide-react';

export default function ForecastCard({ forecast, isDay = 1, className }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  if (!forecast) return null;
  
  const date = forecast.date;
  const maxTemp = forecast.day.maxtemp_c;
  const minTemp = forecast.day.mintemp_c;
  const condition = forecast.day.condition;
  const dailyChanceOfRain = forecast.day.daily_chance_of_rain;
  const dailyChanceOfSnow = forecast.day.daily_chance_of_snow;
  const totalPrecip = forecast.day.totalprecip_mm;
  
  // Map of weather icons based on condition
  const getWeatherIcon = (code) => {
    const iconMap = {
      '1000': Sun,  // Clear
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
    
    const IconComponent = iconMap[code] || Cloud;
    return IconComponent ? <IconComponent className="h-10 w-10" /> : <Cloud className="h-10 w-10" />;
  };
  
  const weatherIcon = getWeatherIcon(condition.code);
  
  // Get appropriate background color
  const getBgClass = () => {
    // Rainy days
    if (dailyChanceOfRain > 60 || totalPrecip > 5) {
      return "bg-gradient-to-br from-slate-300 to-slate-500 dark:from-slate-700 dark:to-slate-900 text-white";
    }
    // Snowy days
    else if (dailyChanceOfSnow > 30) {
      return "bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-600 dark:to-slate-800 text-slate-900 dark:text-white";
    }
    // Sunny days
    else if (condition.code === 1000) {
      return "bg-gradient-to-br from-sky-300 to-blue-500 dark:from-sky-700 dark:to-blue-900 text-white";
    }
    // Cloudy days
    else if ([1003, 1006, 1009].includes(condition.code)) {
      return "bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800 text-slate-900 dark:text-white";
    }
    // Default
    return "bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-950 text-white";
  };
  
  return (
    <div className={cn(
      "rounded-xl p-4 shadow-md",
      getBgClass(),
      "transition-all ease-in-out duration-200",
      "backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col space-y-3">
        <div className="text-lg font-medium">{formatDate(date, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Thermometer className="h-5 w-5 opacity-80" />
              {formatTemperature(maxTemp)}
            </div>
            <div className="opacity-80">Low: {formatTemperature(minTemp)}</div>
          </div>
          
          <div className="flex flex-col items-center">
            {weatherIcon}
            <div className="text-sm mt-1">{condition.text}</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1">
            <Umbrella className="h-4 w-4 opacity-80" />
            <span>{dailyChanceOfRain}%</span>
          </div>
          
          <div className="text-sm opacity-80">
            {totalPrecip} mm
          </div>
        </div>
      </div>
    </div>
  );
}