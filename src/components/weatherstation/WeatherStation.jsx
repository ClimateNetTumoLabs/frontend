import React from "react";
import styles from "./WeatherStation.module.css";
import station from "./Newversion.svg";
import { useState, useEffect } from "react";
import weatherdata from "../../weather_data.json";

function WeatherStation() {
  const [weatherData, setWeatherData] = useState(weatherdata);
  const [isHovering, setIsHovering] = useState(false);
  console.log(station, "llllll");

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

  const e = weatherData[0];

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
 
  return (
    <div
    className={styles.station_container}
    // onMouseOver={handleMouseOver}
    // onMouseOut={handleMouseOut}
  >
    <img src={station} className={styles.station_img} alt="Station" />
    {isHovering && (
      <div className={styles.hovering}>
        {Object.entries(e).map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
      </div>
    )}
  </div>
  );
}

export default WeatherStation;
