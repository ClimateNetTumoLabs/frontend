import React, { useState, useEffect } from "react";
import style from "./Test.module.css";
import weatherdata from "../../weather_data.json";

const WeatherInfo = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(weatherdata).then((res) => res.json());
        setWeatherData(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    })();
  }, []);
  console.log(weatherData);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const e = weatherData[0]; // Assuming you want to display the first weather report
  // console.log(e);
  // console.log(weatherData);

  if (!e) {
    return <div>No weather data available.</div>;
  }

  return (
    <div className={style.weather_info}>
      <h1>Weather Information</h1>
      <p>Humidity: {e.humidity}</p>
      <p>Temperature: {e.temperature}°C</p>
      <p>Pressure: {e.pressure}</p>
      <p>CO2: {e.co2}</p>
    </div>
  );
};

export default WeatherInfo;
