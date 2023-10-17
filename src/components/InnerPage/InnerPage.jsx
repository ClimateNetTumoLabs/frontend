import React, { useEffect, useState } from "react";
import styles from "./InnerPage.module.css";
import { ReactComponent as DeviceImage } from "../../assets/images/device_image.svg";
import { useParams } from "react-router-dom";
import WeatherDataGraphs from "../../components/Weatherdatagraphs/WeatherDataGraphs";
import axios from "axios";
import Loader from "react-js-loader";
import HoverToDevice from "../HoverToDevice/HoverToDevice";

function InnerPage() {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [weather_data, change_weather_data] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/device/${params["id"]}`)
      .then((response) => {
        change_weather_data(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <Loader
            type="box-rectangular"
            bgColor={"#FFFFFF"}
            color={"#FFFFFF"}
            size={100}
          />
        </div>
      )}
      {weather_data === null || weather_data.length === 0 ? (
        <div className={styles.not_data}>Data not found</div>
      ) : (
        <div className={styles.inner_page}>
          <DeviceImage />
          <HoverToDevice data={weather_data} />
          <WeatherDataGraphs data={weather_data} />
        </div>
      )}
    </>
  );
}

export default InnerPage;
