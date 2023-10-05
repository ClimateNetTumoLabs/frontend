import React, {useEffect, useState} from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ChartExample from "../datachart/DataChart";
import styles from './WeatherDataGraphs.module.css'
import axios from 'axios';


const show_data_function = (some_array, need_data) => {
  let local_array = []
  let axis = []

  some_array.map(item => {
    let a = {}
    need_data.map((value) => {
      a[value] = item[value]
    })
    local_array.push(a)
  });
  need_data.splice(-1)
  need_data.map((item) => {
    axis.push({
      xKey : "time",
      yKey : item
    })
  })
  const returned_value = { data : local_array, name : axis}
  return returned_value
}


const InnerTabs = () => {
  //TODO change request to dinamic link
  const [weather_data, change_weather_data] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/device/0/');
        change_weather_data(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
      <Tabs defaultActiveKey="hum_temp"  id="uncontrolled-tab-example"  className={styles.tabs_section}>
        <Tab className={styles.tab} eventKey="hum_temp" title="Temperature & Humidity" >
          <ChartExample
              text = "Temperature & Humidity Info"
              subtitle = "We show default 24 pints, if you want you can change it from filter"
              information = {show_data_function(weather_data, ["humidity", "temperature", "time"])}
          />
        </Tab>
        <Tab eventKey="air_quality" title="Air Quality">
          <ChartExample
              text = "Air Quality Info"
              subtitle = "We show default 24 pints, if you want you can change it from filter"
              information = {show_data_function(weather_data, ["pm1", "pm2_5", "pm10", "time"])}
          />
        </Tab>
        <Tab eventKey="wind_and_rain" title="Wind & Rain">
          <ChartExample
              text = "Wind & Rain Info"
              subtitle = "We show default 24 pints, if you want you can change it from filter"
              information = {show_data_function(weather_data, ["direction", "speed", "rain", "time"])}
          />
        </Tab>
      </Tabs>
  );
}

export default InnerTabs;


