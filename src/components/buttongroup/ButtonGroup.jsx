import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DustChart from "../dustchart/DustChart";
import WeatherChart from "../weatherchart/WeatherChart";
import PressureCo2 from "../pressureco2/PressureCo2";
import styles from  './ButtonGroup.module.css'
import Weatherdata from '../../weather_data.json'


const ButtonGroups = () => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [fetchedWeatherData, setFetchedWeatherData] = useState(null);

  const handleChartClick = (chartNumber) => {
    setSelectedChart(chartNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("path_to_your_json/weather_station.json");
        const data = await response.json();
        setFetchedWeatherData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ButtonGroup size="lg" className={`${styles.mb-2} mb-2`}>
        <Button onClick={() => handleChartClick(1)}>Dust Chart</Button>
        <Button onClick={() => handleChartClick(2)}>Weather Chart</Button>
        <Button onClick={() => handleChartClick(3)}>Pressure & CO2 Chart</Button>
      </ButtonGroup>

      {selectedChart === 1 && <DustChart temperature={fetchedWeatherData.temperature} humidity={fetchedWeatherData.humidity} />}
      {selectedChart === 2 && <WeatherChart data={fetchedWeatherData.pm1} />}
      {selectedChart === 3 && <PressureCo2 co2Data={fetchedWeatherData.co2} pressureData={fetchedWeatherData.pressure} />}
    </div>
  );
};

export default ButtonGroups




