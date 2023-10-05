import React, { useEffect, useState } from "react";
import styles from "./InnerPage.module.css";
import { ReactComponent as DeviceImage } from "../../assets/images/device_image.svg";
import {useLocation, useParams} from "react-router-dom";
import WeatherDataGraphs from "../../components/Weatherdatagraphs/WeatherDataGraphs";
import Datepickertofrom from "../Calendar/Datepickertofrom";
import axios from "axios";

// const ShowHoverData = (data) => {
//   const { pathname } = useLocation();
//
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//
//   const last_element = data[data.length - 1];
//   const alldata = {
//     Temperature: last_element["temperature"],
//     Humidity: last_element["humidity"],
//     Pressure: last_element["pressure"],
//     Pm1: last_element["pm1"],
//     Pm2_5: last_element["pm2_5"],
//     Pm10: last_element["pm10"],
//   };
//   const rain = {
//     rain: last_element["rain"],
//   };
//   const direction = {
//     direction: last_element["direction"],
//   };
//
//   const speed = {
//     speed: last_element["speed"],
//   };
//   return { alldata, speed, direction, rain };
// };
//
// function customStringify(obj) {
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) {
//       return `[${obj.map((item) => customStringify(item)).join(" ")}]`;
//     } else {
//       return `${Object.entries(obj)
//         .map(([key, value]) => `${key}: ${customStringify(value)}`)
//         .join(" ")}`;
//     }
//   } else {
//     return String(obj);
//   }
// }
//
// function HoverPart (weather_data) {
//   const [popupContent] = useState(ShowHoverData(weather_data));
//
//   useEffect(() => {
//     const handleMouseEnter = (event) => {
//       const targetElement = event.target;
//       const elementId = targetElement.id;
//       const popupId = targetElement.dataset.popup;
//       const popup = document.getElementById(popupId);
//       const popupText = popupContent[elementId];
//       if (popup) {
//         popup.innerHTML = customStringify(popupText);
//         popup.style.visibility = "visible";
//       }
//     };
//
//     const handleMouseLeave = (event) => {
//       const targetElement = event.target;
//       const popupId = targetElement.dataset.popup;
//       const popup = document.getElementById(popupId);
//       if (popup) {
//         popup.style.visibility = "hidden";
//       }
//     };
//
//     const ids = ["direction", "speed", "rain", "alldata"];
//
//     ids.map((id) => {
//       const element = document.getElementById(id);
//
//       if (element) {
//         element.addEventListener("mouseenter", handleMouseEnter);
//         element.addEventListener("mouseleave", handleMouseLeave);
//       }
//     });
//
//     return () => {
//       ids.map((id) => {
//         const element = document.getElementById(id);
//
//         if (element) {
//           element.removeEventListener("mouseenter", handleMouseEnter);
//           element.removeEventListener("mouseleave", handleMouseLeave);
//         }
//       });
//     };
//   }, [popupContent]);
// }

function InnerPage() {
    const params = useParams();
    const [isLoading, setLoading] = useState(true)
    const [weather_data, change_weather_data] = useState([])

    useEffect(() => {
      axios.get("http://localhost:8000/device/" + params["id"])
          .then((response) => {
            change_weather_data(response.data);
            setLoading(false)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []
    );
    if(isLoading) {
        return  <div>Loading...</div>
    }

  return (
    <div className={styles.inner_page}>
      <DeviceImage />
      <Datepickertofrom />
    </div>
  );
}

export default InnerPage;
