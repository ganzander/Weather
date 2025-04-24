// API utility functions for WeatherAPI.com

// Base URL for WeatherAPI
const API_BASE_URL = 'https://api.weatherapi.com/v1';

// Cache to store previous API responses
const cache = {};

/**
 * Get current weather data for a location
 * @param {string} location - City name or coordinates
 * @param {string} apiKey - WeatherAPI API key
 * @returns {Promise<Object>} Weather data
 */
export async function getCurrentWeather(location, apiKey) {
  if (!location || !apiKey) return null;
  
  const cacheKey = `current-${location}`;
  
  // Check cache first
  if (cache[cacheKey] && cache[cacheKey].timestamp > Date.now() - 10 * 60 * 1000) {
    return cache[cacheKey].data;
  }
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache the response
    cache[cacheKey] = {
      timestamp: Date.now(),
      data
    };
    
    return data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return null;
  }
}

/**
 * Get forecast weather data for a location
 * @param {string} location - City name or coordinates
 * @param {string} apiKey - WeatherAPI API key
 * @param {number} days - Number of days (1-3)
 * @returns {Promise<Object>} Forecast data
 */
export async function getForecast(location, apiKey, days = 3) {
  if (!location || !apiKey) return null;
  
  const cacheKey = `forecast-${location}-${days}`;
  
  // Check cache first
  if (cache[cacheKey] && cache[cacheKey].timestamp > Date.now() - 30 * 60 * 1000) {
    return cache[cacheKey].data;
  }
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=${days}&aqi=yes&alerts=yes`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache the response
    cache[cacheKey] = {
      timestamp: Date.now(),
      data
    };
    
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
}

/**
 * Search for locations by query
 * @param {string} query - Search query
 * @param {string} apiKey - WeatherAPI API key
 * @returns {Promise<Array>} Location search results
 */
export async function searchLocations(query, apiKey) {
  if (!query || !apiKey) return [];
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

/**
 * Get air quality data for a location
 * @param {string} location - City name or coordinates
 * @param {string} apiKey - WeatherAPI API key
 * @returns {Promise<Object>} Air quality data
 */
export async function getAirQuality(location, apiKey) {
  if (!location || !apiKey) return null;
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.current.air_quality;
  } catch (error) {
    console.error('Error fetching air quality:', error);
    return null;
  }
}