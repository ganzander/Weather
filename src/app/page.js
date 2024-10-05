"use client";
import axios from "axios";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater, faWind } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [imgPresent, setImagePresent] = useState(false);
  const [details, setDetails] = useState({
    temperature: "",
    description: "",
    humidity: "",
    wind: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.Api_Key}&units=metric`
        )
        .then((result) => {
          console.log(result.data.weather[0].main);
          setImagePresent(true);
          setDetails({
            description: `${result.data.weather[0].description}`,
            humidity: `${result.data.main.humidity}%`,
            wind: `${result.data.wind.speed}Km/h`,
            temperature: `${result.data.main.temp}°C`,
          });
          switch (result.data.weather[0].main) {
            case "Clear":
              setImage("/clear.png");
              break;
            case "Rain":
              setImage("/rain.png");
              break;
            case "Snow":
              setImage("/snow.png");
              break;
            case "Clouds":
              setImage("/cloud.png");
              break;
            case "Haze":
              setImage("/mist.png");
              break;
            case "Mist":
              setImage("/mist.png");
              break;
            default:
              setImage("/404.png");
          }
        });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#258db3] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="mt-28 max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-7 md:p-8 shadow-2xl bg-white dark:bg-black">
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="location" className="text-center text-lg">
              Location
            </Label>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              className="form-control me-2"
              id="location"
              name="location"
              autoComplete="off"
              required
            />
          </LabelInputContainer>

          {imgPresent ? (
            <>
              <div className="flex flex-col mb-5 items-center justify-center w-full mt-4">
                <Image
                  className="weatherBox img-fluid"
                  alt="Weather Icon"
                  src={image}
                  width={150}
                  height={150}
                />
                <p className="temperature">{details.temperature}</p>
                <p className="description capitalize">{details.description}</p>
              </div>

              <div className="flex justify-evenly items-center fadeIn mt-4">
                <div className="flex flex-col items-center justify-center">
                  <FontAwesomeIcon
                    icon={faWater}
                    size="2xl"
                    className="text-2xl"
                  />
                  <div className="text-center">
                    <span className="h5">{details.humidity}</span>
                    <p className="mb-0 small">Humidity</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <FontAwesomeIcon
                    icon={faWind}
                    size="2xl"
                    className="text-2xl"
                  />
                  <div className="text-center">
                    <span className="h5 text-primary">{details.wind}</span>
                    <p className="mb-0 small text-primary">Wind Speed</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center items-center mt-4">
              <button
                className="relative group/btn text-white bg-black dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-1/2 dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Submit
                <BottomGradient />
              </button>
            </div>
          )}

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
