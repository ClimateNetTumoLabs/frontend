import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "react-js-loader";
import styles from "./InnerPage.module.css";
import InnerPageLeftNav from "../InnerPageLeftNav/InnerPageLeftNav";
import InnerPageContent from "../InnerPageContent/InnerPageContent";
import { PositionContext } from "../../context/PositionContext";

function InnerPage() {
    const params = useParams();
    const [isLoading, setLoading] = useState(true);
    const [weather_data, change_weather_data] = useState(null);
    const [filterState, filterStateChange] = useState('Hourly');
    const { position, permissionGranted, setPosition, setPermissionGranted } = useContext(PositionContext);

    useEffect(() => {
        if (!permissionGranted) {
          const askForPermissionAgain = () => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
                setPermissionGranted(true);
              });
            } else {
              console.log("Geolocation is not available in your browser.");
            }
          };
          
          askForPermissionAgain();
        }
      }, [permissionGranted, setPosition, setPermissionGranted]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`/device/${params.id}`, { withCredentials: true })
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
        return <div className={styles.not_data}>
            Data Not Found
        </div>;
    }

    return (
        <div className={styles.inner_page}>
            <InnerPageLeftNav filterState={filterState} filterChange={filterStateChange} selected_device_id = {params.id}/>
            <InnerPageContent content={filterState} weather_data = {weather_data}/>x
            {/*<DeviceImage />*/}
            {/*/!* <DownloadButton/> *!/*/}
            {/*<HoverToDevice data={weather_data} />*/}
            {/*<WeatherDataGraphs data={weather_data} />*/}
        </div>
    );
}

export default InnerPage;
