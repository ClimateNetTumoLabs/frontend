import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WeatherDataGraphs from "../../components/Weatherdatagraphs/WeatherDataGraphs";
import axios from "axios";
import Loader from "react-js-loader";
import HoverToDevice from "../HoverToDevice/HoverToDevice";
import styles from "./InnerPage.module.css";
import { ReactComponent as DeviceImage } from "../../assets/images/Tumo.svg";

function InnerPage() {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [weather_data, change_weather_data] = useState(null);

  useEffect(() => {
    axios
      .get(`https://${window.location.hostname}:8000/device/${params.id}`)
      .then((response) => {
        change_weather_data(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [params.id]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Loader
          type="box-rectangular"
          bgColor={"#FFFFFF"}
          color={"#FFFFFF"}
          size={100}
        />
      </div>
    );
  }

  if (!weather_data || weather_data.length === 0) {
    return <div className={styles.not_data}>Data not found</div>;
  }

  return (
    <div className={styles.inner_page}>
      <DeviceImage />
      <HoverToDevice data={weather_data} />
      <WeatherDataGraphs data={weather_data} />
    </div>
  );
}

export default InnerPage;
