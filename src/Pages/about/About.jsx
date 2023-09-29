import React from 'react';
import './About.module.css';
import WeatherStation from '../../components/weatherstation/WeatherStation';
import WeatherChart from '../../components/weatherchart/WeatherChart';
import Test from '../../components/test/Test';
import DustChart from '../../components/dustchart/DustChart';
import ChartContainer from '../../components/test/ChartContainer';
import ButtonTextDisplay from '../../components/Exem/ButtonTextDisplay';
import Calendar from '../../components/calendar/Calendar';


const About = () => {

  return (
    <div className='text_white'>
        <WeatherStation />
        {/* <ChartContainer/> */}
        {/* <WeatherInfo /> */}
        {/* <WeatherChart /> */}
        {/* <Test /> */}
        {/* <DustChart /> */}



       <Calendar />


        <ButtonTextDisplay/>
        

    </div>
  )
}

export default About