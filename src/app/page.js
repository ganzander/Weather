"use client";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faLocationDot,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import Navbar from "@/components/Navbar";
import Image from "next/image";

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
    <div style={{ height: "100vh", backgroundColor: "#258db3" }}>
      <Navbar />

      <div className="container d-flex flex-column align-items-center py-5">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <div className="search-box d-flex align-items-center">
              <FontAwesomeIcon
                icon={faLocationDot}
                size="2x"
                className="me-3 text-primary"
              />
              <form onSubmit={handleSubmit} className="d-flex w-100">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="form-control me-2"
                />
                <button type="submit" className="btn btn-primary">
                  <FontAwesomeIcon icon={faSearchengin} />
                </button>
              </form>
            </div>
            {imgPresent && (
              <>
                <div className="text-center mt-4">
                  <Image
                    className="weatherBox img-fluid"
                    alt="Weather Icon"
                    src={image}
                    width={150}
                    height={150}
                  />
                  <p className="temperature display-4 text-primary">
                    {details.temperature}
                  </p>
                  <p className="description text-capitalize">
                    {details.description}
                  </p>
                </div>
                <div className="weather-details row text-center fadeIn mt-4">
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={faWater}
                      size="lg"
                      className="me-2 text-primary"
                    />
                    <div className="text-start">
                      <span className="h5 text-primary">
                        {details.humidity}
                      </span>
                      <p className="mb-0 small text-primary">Humidity</p>
                    </div>
                  </div>
                  <div className="col-6 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={faWind}
                      size="lg"
                      className="me-2 text-primary"
                    />
                    <div className="text-start">
                      <span className="h5 text-primary">{details.wind}</span>
                      <p className="mb-0 small text-primary">Wind Speed</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
