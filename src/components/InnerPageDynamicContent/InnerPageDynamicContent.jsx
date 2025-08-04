import React, {useEffect, useRef, useState} from "react";
import styles from './InnerPageDynamicContent.module.css'
import WeatherDataGraphs from "../WeatherDataGraphs/WeatherDataGraphs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {ReactComponent as FullScreen} from "../../assets/Icons/full-screen.svg";
import {useTranslation} from "react-i18next";
import "../../i18n";

function InnerPageDynamicContent(props) {
    const {t} = useTranslation();
    const [selectedTab, setSelectedTab] = useState("tem_and_hum");
    const [temperature, setTemperature] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [pressure, setPressure] = useState([]);
    const [time, setTime] = useState([]);
    const [pm1, setPm1] = useState([])
    const [pm2_5, setPm2_5] = useState([])
    const [pm10, setPm10] = useState([])
    const [UV, setUV] = useState([])
    const [VisibleLight, setVisibleLight] = useState([])
    const [RainCount, setRainCount] = useState([])
    const [WindSpeed, setWindSpeed] = useState([])
    const ChartsRef = useRef(null)
    const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(true);
    const [filteredWeatherData, setFilteredWeatherData] = useState([]);

    // Function to generate complete weather data with 15-minute intervals and null values
    const generateCompleteWeatherData = (data) => {
      if (!data || data.length === 0) return [];

      // Extract all valid timestamps from the data
      const timestamps = data
          .map(item => {
              const dateStr = item["hour"] || item["date"] || item["time_interval"];
              const date = new Date(dateStr);
              return isNaN(date.getTime()) ? null : date;
          })
          .filter(date => date !== null);

      if (timestamps.length === 0) return [];

      // Find min and max timestamps
      const minTime = new Date(Math.min(...timestamps.map(d => d.getTime())));
      const maxTime = new Date(Math.max(...timestamps.map(d => d.getTime())));

      // Round minTime down to the nearest 15-minute interval
      minTime.setMinutes(Math.floor(minTime.getMinutes() / 15) * 15);
      minTime.setSeconds(0);
      minTime.setMilliseconds(0);

      // Generate complete 15-minute intervals between min and max
      const completeTime = [];
      let currentTime = new Date(minTime);

      while (currentTime <= maxTime) {
          completeTime.push(new Date(currentTime));
          currentTime = new Date(currentTime.getTime() + 15 * 60 * 1000); // Add 15 minutes
      }

      // Create a map of existing data points for quick lookup
      const dataMap = {};
      data.forEach(item => {
          const dateStr = item["hour"] || item["date"] || item["time_interval"];
          const date = new Date(dateStr);
          if (!isNaN(date.getTime())) {
              // Round to nearest 15 minutes to match our complete timeline
              const roundedDate = new Date(date);
              roundedDate.setMinutes(Math.floor(roundedDate.getMinutes() / 15) * 15);
              roundedDate.setSeconds(0);
              roundedDate.setMilliseconds(0);
              dataMap[roundedDate.getTime()] = item;
          }
      });

      // Generate the complete weather data array with null values for missing intervals
      const completeWeatherData = completeTime.map(timestamp => {
          const existingData = dataMap[timestamp.getTime()];
          if (existingData) {
              return existingData;
          } else {
              // Create a new entry with null values for all metrics
              return {
                  time_interval: timestamp.toISOString(),
                  temperature: null,
                  humidity: null,
                  pressure: null,
                  pm1: null,
                  pm2_5: null,
                  pm10: null,
                  uv: null,
                  lux: null,
                  rain: null,
                  speed: null,
                  direction: null
              };
          }
      });

      return completeWeatherData;
  };

    const toggleFullScreen = () => {
        const chartElement = ChartsRef.current;
      
        if (chartElement) {
          if (!document.fullscreenElement) {
            chartElement.style.overflow = 'auto';
            
            chartElement.requestFullscreen().catch(err => {
              console.error('Failed to enter fullscreen mode:', err);
            });
          } else {
            document.exitFullscreen();
          }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
          if (document.fullscreenElement) {
            // In fullscreen mode
            document.body.style.overflow = 'auto';
          } else {
            // Exited fullscreen mode
            document.body.style.overflow = '';
          }
        };
      
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
          document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
          const chartElement = ChartsRef.current;
          if (document.fullscreenElement) {
            chartElement.style.touchAction = 'pan-x pan-y';
          }
        };
      
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const scrollToChart = () => {
        setTimeout(() => {
          const chartElement = document.getElementById("chart");
          if (chartElement) {
            chartElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
    };

    useEffect(() => {
      if (!props.weather_data) return;
      
      // Generate the complete weather data with filled intervals
      const completeWeatherData = generateCompleteWeatherData(props.weather_data);
      setFilteredWeatherData(completeWeatherData);
      
      // Process the data for the charts
      const temperatureArray = [];
      const humidityArray = [];
      const pressureArray = [];
      const timeArray = [];
      const pm1Array = [];
      const pm2_5Array = [];
      const pm10Array = [];
      const UVIndexArray = [];
      const VisibleLightArray = [];
      const RainCountArray = [];
      const WindSpeedArray = [];

      completeWeatherData.forEach((element) => {
          temperatureArray.push(element.temperature);
          humidityArray.push(element.humidity);
          pressureArray.push(element.pressure);
          pm1Array.push(element.pm1);
          pm2_5Array.push(element.pm2_5);
          pm10Array.push(element.pm10);
          timeArray.push(element.time_interval);
          UVIndexArray.push(element.uv);
          VisibleLightArray.push(element.lux);
          RainCountArray.push(element.rain);
          WindSpeedArray.push(element.speed);
      });

      setTemperature(temperatureArray);
      setHumidity(humidityArray);
      setPressure(pressureArray);
      setTime(timeArray);
      setPm1(pm1Array);
      setPm2_5(pm2_5Array);
      setPm10(pm10Array);
      setUV(UVIndexArray);
      setVisibleLight(VisibleLightArray);
      setRainCount(RainCountArray);
      setWindSpeed(WindSpeedArray);
  }, [props.weather_data]);

    return (
        <div ref={ChartsRef} className={`${styles.InnerPageDynamicContent}`}>
            <div onClick={toggleFullScreen} className={styles.FullScreenButtonSection}>
                <FullScreen className={`fas fa-expand ${styles.fullscreen_button}`}/>
            </div>
            <div className={styles.chart}>
                <div className={styles.tabContainer} id="dynamicContent">
                    <Tabs
                        defaultActiveKey={selectedTab}
                        className={styles.tabs_section}
                        onSelect={(tab) => {setSelectedTab(tab); scrollToChart()}}
                    >
                        <Tab eventKey="tem_and_hum"
                             title={t('innerPageDynamicContent.tabTitles.temperatureAndHumidity')}>
                            {selectedTab === "tem_and_hum" &&
                                <WeatherDataGraphs
                                    weather_data={filteredWeatherData}
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    setStartDate={props.setStartDate}
                                    setEndDate={props.setEndDate}
                                    className={styles.graph}
                                    types={[t('innerPageDynamicContent.temperature'), t('innerPageDynamicContent.humidity')]}
                                    data={[temperature, humidity]}
                                    time={time}
                                    colors={['#fffA75', '#77B6EA']}
                                    timeline={props.period}
                                    leftLoad={props.leftLoad}
                                    setLeftLoad={props.setLeftLoad}
                                    filterChange={props.filterChange}
                                    error={props.error}
                                    setError={props.setError}
                                    filterPressed={props.filterPressed}
                                    setFilterPressed={props.setFilterPressed}
                                    filterState={props.filterState}
                                    selected_device_id={props.selected_device_id}
                                    showWelcomeOverlay={showWelcomeOverlay}
                                    setShowWelcomeOverlay={setShowWelcomeOverlay}
                                    minDate={props.minDate}
                                    selectedTab={selectedTab}
                                    stats={props.stats}
                                />
                            }
                        </Tab>
                        <Tab eventKey="pm" title={t('innerPageDynamicContent.tabTitles.airQuality')}>
                            {selectedTab === "pm" &&
                                <WeatherDataGraphs
                                    weather_data={filteredWeatherData}
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    setStartDate={props.setStartDate}
                                    setEndDate={props.setEndDate}
                                    className={styles.graph}
                                    leftLoad={props.leftLoad}
                                    setLeftLoad={props.setLeftLoad}
                                    timeline={props.period}
                                    types={["PM 1", "PM 2.5", "PM 10"]}
                                    data={[pm1, pm2_5, pm10]}
                                    time={time}
                                    colors={['#f80000', '#e1d816', '#49B618']}
                                    filterChange={props.filterChange}
                                    error={props.error}
                                    setError={props.setError}
                                    filterPressed={props.filterPressed}
                                    setFilterPressed={props.setFilterPressed}
                                    filterState={props.filterState}
                                    selected_device_id={props.selected_device_id}
                                    showWelcomeOverlay={showWelcomeOverlay}
                                    setShowWelcomeOverlay={setShowWelcomeOverlay}
                                    minDate={props.minDate}
                                    selectedTab={selectedTab}
                                    stats={props.stats}
                                />
                            }
                        </Tab>
                        <Tab eventKey="pressure" title={t('innerPageDynamicContent.tabTitles.pressure')}>
                            {selectedTab === "pressure" &&
                                <WeatherDataGraphs
                                    weather_data={filteredWeatherData}
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    setStartDate={props.setStartDate}
                                    setEndDate={props.setEndDate}
                                    className={styles.graph}
                                    leftLoad={props.leftLoad}
                                    setLeftLoad={props.setLeftLoad}
                                    timeline={props.period}
                                    types={[t('innerPageDynamicContent.pressure')]}
                                    data={[pressure]}
                                    time={time}
                                    colors={["#FFFF00"]}
                                    filterChange={props.filterChange}
                                    error={props.error}
                                    setError={props.setError}
                                    filterPressed={props.filterPressed}
                                    setFilterPressed={props.setFilterPressed}
                                    filterState={props.filterState}
                                    selected_device_id={props.selected_device_id}
                                    showWelcomeOverlay={showWelcomeOverlay}
                                    setShowWelcomeOverlay={setShowWelcomeOverlay}
                                    minDate={props.minDate}
                                    selectedTab={selectedTab}
                                    stats={props.stats}
                                />
                            }
                        </Tab>
                        <Tab eventKey="light" title={t('innerPageDynamicContent.tabTitles.light')}>
                            {selectedTab === "light" &&
                                <WeatherDataGraphs
                                    weather_data={filteredWeatherData}
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    setStartDate={props.setStartDate}
                                    setEndDate={props.setEndDate}
                                    className={styles.graph}
                                    leftLoad={props.leftLoad}
                                    setLeftLoad={props.setLeftLoad}
                                    timeline={props.period}
                                    types={[t('innerPageDynamicContent.light_uv'), t('innerPageDynamicContent.light_intensity')]}
                                    data={[UV, VisibleLight]}
                                    time={time}
                                    colors={["#00FF00", "#00FFFF"]}
                                    filterChange={props.filterChange}
                                    error={props.error}
                                    setError={props.setError}
                                    filterPressed={props.filterPressed}
                                    setFilterPressed={props.setFilterPressed}
                                    filterState={props.filterState}
                                    selected_device_id={props.selected_device_id}
                                    showWelcomeOverlay={showWelcomeOverlay}
                                    setShowWelcomeOverlay={setShowWelcomeOverlay}
                                    minDate={props.minDate}
                                    selectedTab={selectedTab}
                                    stats={props.stats}
                                />
                            }
                        </Tab>
                        <Tab eventKey="rain_wind" title={t('innerPageDynamicContent.tabTitles.rainAndWind')}>
                            {selectedTab === "rain_wind" &&
                                <WeatherDataGraphs
                                    weather_data={filteredWeatherData}
                                    className={styles.graph}
                                    leftLoad={props.leftLoad}
                                    setLeftLoad={props.setLeftLoad}
                                    timeline={props.period}
                                    types={[t('innerPageDynamicContent.rain'), t('innerPageDynamicContent.windSpeed')]}
                                    data={[RainCount, WindSpeed]}
                                    time={time}
                                    colors={["#6688aa", "#BA9593", "#EDAFFB"]}
                                    filterChange={props.filterChange}
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    setStartDate={props.setStartDate}
                                    setEndDate={props.setEndDate}
                                    error={props.error}
                                    setError={props.setError}
                                    filterPressed={props.filterPressed}
                                    setFilterPressed={props.setFilterPressed}
                                    filterState={props.filterState}
                                    selected_device_id={props.selected_device_id}
                                    showWelcomeOverlay={showWelcomeOverlay}
                                    setShowWelcomeOverlay={setShowWelcomeOverlay}
                                    minDate={props.minDate}
                                    selectedTab={selectedTab}
                                    stats={props.stats}
                                />
                            }
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default InnerPageDynamicContent;