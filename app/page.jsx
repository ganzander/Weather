"use client";

import { useState, useEffect } from "react";
import { CloudSun } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";
import HourlyForecast from "@/components/HourlyForecast";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherAlerts from "@/components/WeatherAlerts";
import { getCurrentWeather, getForecast } from "@/lib/api";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    temperature: true,
    precipitation: true,
    wind: true,
    humidity: true,
  });

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              if (position && position.coords) {
                const { latitude, longitude } = position.coords;
                await fetchWeatherData(`${latitude},${longitude}`);
              }
            },
            async (error) => {
              console.log(
                "Geolocation not available or denied, using default location"
              );
              // Default to London if geolocation fails or is denied
              await fetchWeatherData("London");
            },
            {
              timeout: 5000,
              maximumAge: 0,
              enableHighAccuracy: true,
            }
          );
        } else {
          // Fallback to London if geolocation is not supported
          await fetchWeatherData("London");
        }
      } catch (err) {
        console.error("Error fetching initial location:", err);
        setError("Failed to fetch weather data. Please try again.");
        setLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  const fetchWeatherData = async (location) => {
    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      const [currentData, forecast] = await Promise.all([
        getCurrentWeather(location, API_KEY),
        getForecast(location, API_KEY, 3),
      ]);

      if (!currentData || !forecast) {
        throw new Error("Failed to fetch weather data");
      }

      setWeatherData(currentData);
      setForecastData(forecast);
      setSelectedLocation(currentData.location);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    fetchWeatherData(location.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header with search */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CloudSun className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Weather Forecast</h1>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-3">
            <SearchBar
              onLocationSelect={handleLocationSelect}
              apiKey={API_KEY}
              className="flex-1"
            />
          </div>
        </header>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg my-6">
            {error}
          </div>
        )}

        {/* Weather alerts */}
        {forecastData && forecastData.alerts && (
          <WeatherAlerts alerts={forecastData.alerts} className="mb-6" />
        )}

        {/* Main weather content */}
        {weatherData && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current weather card */}
            <div className="md:col-span-3">
              <WeatherCard
                weatherData={weatherData}
                className="w-full h-full"
              />
            </div>

            {/* 3-day forecast */}
            <div className="md:col-span-3">
              <h3 className="text-lg font-medium mb-3">3-Day Forecast</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {forecastData &&
                  forecastData.forecast &&
                  forecastData.forecast.forecastday.map((day, index) => (
                    <ForecastCard
                      key={day.date}
                      forecast={day}
                      className="h-full"
                    />
                  ))}
              </div>
            </div>

            {/* Left column - Hourly forecast & Map */}
            <div className="md:col-span-3 space-y-6">
              {activeFilters.temperature &&
                forecastData &&
                forecastData.forecast && (
                  <HourlyForecast
                    forecast={forecastData.forecast.forecastday[0]}
                  />
                )}
            </div>

            {/* Right column - Weather details */}
            <div className="md:col-span-3">
              {(activeFilters.wind ||
                activeFilters.humidity ||
                activeFilters.precipitation) && (
                <WeatherDetails weatherData={forecastData} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-border/30 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Weather data provided by{" "}
            <a
              href="https://www.weatherapi.com/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              WeatherAPI.com
            </a>
          </p>
          <p className="mt-1">© {new Date().getFullYear()} Weather App</p>
        </div>
      </footer>
    </div>
  );
}
