import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format temperature with unit
 * @param {number} temp - Temperature value
 * @param {string} unit - 'c' for Celsius, 'f' for Fahrenheit
 * @returns {string} Formatted temperature
 */
export function formatTemperature(temp, unit = 'c') {
  if (temp === undefined || temp === null) return '--';
  return `${Math.round(temp)}°${unit.toUpperCase()}`;
}

/**
 * Get appropriate icon class based on weather code and is_day
 * @param {number} code - Weather condition code from API
 * @param {number} isDay - Whether it's daytime (1) or nighttime (0)
 * @returns {string} Icon class name
 */
export function getWeatherIcon(code, isDay) {
  // This is a simplified mapping
  const iconMap = {
    1000: isDay ? 'sun' : 'moon',  // Clear
    1003: isDay ? 'sun-behind-cloud' : 'cloud',  // Partly cloudy
    1006: 'cloud',  // Cloudy
    1009: 'cloud',  // Overcast
    1030: 'cloud-fog',  // Mist
    1063: 'cloud-drizzle',  // Patchy rain
    1066: 'cloud-snow',  // Patchy snow
    1069: 'cloud-sleet',  // Patchy sleet
    1072: 'cloud-drizzle',  // Patchy freezing drizzle
    1087: 'cloud-lightning',  // Thundery outbreaks
    1114: 'snowflake',  // Blowing snow
    1117: 'snowflake',  // Blizzard
    1135: 'cloud-fog',  // Fog
    1147: 'cloud-fog',  // Freezing fog
    1150: 'cloud-drizzle',  // Patchy light drizzle
    1153: 'cloud-drizzle',  // Light drizzle
    1168: 'cloud-drizzle',  // Freezing drizzle
    1171: 'cloud-rain',  // Heavy freezing drizzle
    1180: 'cloud-drizzle',  // Patchy light rain
    1183: 'cloud-drizzle',  // Light rain
    1186: 'cloud-rain',  // Moderate rain at times
    1189: 'cloud-rain',  // Moderate rain
    1192: 'cloud-rain',  // Heavy rain at times
    1195: 'cloud-rain',  // Heavy rain
    1198: 'cloud-rain',  // Light freezing rain
    1201: 'cloud-rain',  // Moderate or heavy freezing rain
    1204: 'cloud-sleet',  // Light sleet
    1207: 'cloud-sleet',  // Moderate or heavy sleet
    1210: 'cloud-snow',  // Patchy light snow
    1213: 'cloud-snow',  // Light snow
    1216: 'cloud-snow',  // Patchy moderate snow
    1219: 'cloud-snow',  // Moderate snow
    1222: 'cloud-snow',  // Patchy heavy snow
    1225: 'cloud-snow',  // Heavy snow
    1237: 'cloud-hail',  // Ice pellets
    1240: 'cloud-drizzle',  // Light rain shower
    1243: 'cloud-rain',  // Moderate or heavy rain shower
    1246: 'cloud-rain',  // Torrential rain shower
    1249: 'cloud-sleet',  // Light sleet showers
    1252: 'cloud-sleet',  // Moderate or heavy sleet showers
    1255: 'cloud-snow',  // Light snow showers
    1258: 'cloud-snow',  // Moderate or heavy snow showers
    1261: 'cloud-hail',  // Light showers of ice pellets
    1264: 'cloud-hail',  // Moderate or heavy showers of ice pellets
    1273: 'cloud-lightning',  // Patchy light rain with thunder
    1276: 'cloud-lightning',  // Moderate or heavy rain with thunder
    1279: 'cloud-lightning',  // Patchy light snow with thunder
    1282: 'cloud-lightning',  // Moderate or heavy snow with thunder
  };

  return iconMap[code] || 'cloud-question';
}

/**
 * Format date with options
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export function formatDate(date, options = {}) {
  const defaultOptions = { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(
    typeof date === 'string' ? new Date(date) : date
  );
}

/**
 * Get weather description based on condition code
 * @param {number} code - Weather condition code
 * @returns {string} Weather description
 */
export function getWeatherDescription(code) {
  const descriptions = {
    1000: 'Clear sky',
    1003: 'Partly cloudy',
    1006: 'Cloudy',
    1009: 'Overcast',
    1030: 'Mist',
    1063: 'Patchy rain possible',
    1066: 'Patchy snow possible',
    1069: 'Patchy sleet possible',
    1072: 'Patchy freezing drizzle possible',
    1087: 'Thundery outbreaks possible',
    1114: 'Blowing snow',
    1117: 'Blizzard',
    1135: 'Fog',
    1147: 'Freezing fog',
    1150: 'Patchy light drizzle',
    1153: 'Light drizzle',
    1168: 'Freezing drizzle',
    1171: 'Heavy freezing drizzle',
    1180: 'Patchy light rain',
    1183: 'Light rain',
    1186: 'Moderate rain at times',
    1189: 'Moderate rain',
    1192: 'Heavy rain at times',
    1195: 'Heavy rain',
    1198: 'Light freezing rain',
    1201: 'Moderate or heavy freezing rain',
    1204: 'Light sleet',
    1207: 'Moderate or heavy sleet',
    1210: 'Patchy light snow',
    1213: 'Light snow',
    1216: 'Patchy moderate snow',
    1219: 'Moderate snow',
    1222: 'Patchy heavy snow',
    1225: 'Heavy snow',
    1237: 'Ice pellets',
    1240: 'Light rain shower',
    1243: 'Moderate or heavy rain shower',
    1246: 'Torrential rain shower',
    1249: 'Light sleet showers',
    1252: 'Moderate or heavy sleet showers',
    1255: 'Light snow showers',
    1258: 'Moderate or heavy snow showers',
    1261: 'Light showers of ice pellets',
    1264: 'Moderate or heavy showers of ice pellets',
    1273: 'Patchy light rain with thunder',
    1276: 'Moderate or heavy rain with thunder',
    1279: 'Patchy light snow with thunder',
    1282: 'Moderate or heavy snow with thunder',
  };
  
  return descriptions[code] || 'Unknown weather condition';
}

/**
 * Format wind information
 * @param {number} speed - Wind speed
 * @param {string} direction - Wind direction
 * @returns {string} Formatted wind information
 */
export function formatWind(speed, direction) {
  if (speed === undefined || speed === null) return '--';
  return `${Math.round(speed)} km/h ${direction || ''}`;
}

/**
 * Convert API air quality index to display format
 * @param {Object} aqi - Air quality data
 * @returns {Object} Formatted air quality data
 */
export function formatAirQuality(aqi) {
  if (!aqi) return { level: 'Unknown', value: '--', color: 'gray' };
  
  // US EPA standard
  const usEpa = aqi.us_epa_index;
  
  const levels = {
    1: { level: 'Good', color: 'green' },
    2: { level: 'Moderate', color: 'yellow' },
    3: { level: 'Unhealthy for sensitive groups', color: 'orange' },
    4: { level: 'Unhealthy', color: 'red' },
    5: { level: 'Very Unhealthy', color: 'purple' },
    6: { level: 'Hazardous', color: 'maroon' },
  };
  
  return { 
    ...levels[usEpa] || { level: 'Unknown', color: 'gray' },
    value: usEpa || '--'
  };
}

/**
 * Get background and text colors based on weather conditions
 * @param {number} code - Weather condition code
 * @param {number} isDay - Whether it's daytime (1) or nighttime (0)
 * @returns {Object} Background gradient and text color
 */
export function getWeatherColors(code, isDay) {
  // Default/fallback colors
  let bgGradient = isDay 
    ? 'bg-gradient-to-br from-blue-400 to-blue-700'
    : 'bg-gradient-to-br from-blue-900 to-indigo-950';
  let textColor = 'text-white';
  
  // Clear
  if (code === 1000) {
    bgGradient = isDay 
      ? 'bg-gradient-to-br from-amber-300 to-sky-500'
      : 'bg-gradient-to-br from-indigo-900 to-slate-950';
  }
  // Cloudy
  else if ([1003, 1006, 1009].includes(code)) {
    bgGradient = isDay 
      ? 'bg-gradient-to-br from-slate-300 to-slate-500'
      : 'bg-gradient-to-br from-slate-700 to-slate-950';
  }
  // Rain
  else if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) {
    bgGradient = isDay 
      ? 'bg-gradient-to-br from-slate-400 to-slate-600'
      : 'bg-gradient-to-br from-slate-700 to-slate-950';
  }
  // Snow
  else if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) {
    bgGradient = isDay 
      ? 'bg-gradient-to-br from-slate-200 to-blue-300'
      : 'bg-gradient-to-br from-slate-600 to-slate-900';
    textColor = isDay ? 'text-slate-800' : 'text-white';
  }
  // Thunderstorm
  else if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    bgGradient = isDay 
      ? 'bg-gradient-to-br from-slate-500 to-slate-800'
      : 'bg-gradient-to-br from-slate-700 to-slate-950';
  }
  
  return { bgGradient, textColor };
}