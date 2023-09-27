import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ChartExample from "../Chart/chart";

import weather from '../Chart/weather_data.json'

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
    console.log(returned_value)
    return returned_value
}



const Test = () => {
    // show_data_function(weather, ["humidity", "temperature", "time"])
    return (
        <Tabs  defaultActiveKey="home"  id="uncontrolled-tab-example"  className="mb-3">
            <Tab eventKey="home" title="Home" >
                <ChartExample
                    text = "Erik"
                    subtitle = "Some example for test "
                    information = {show_data_function(weather, ["humidity", "temperature", "time"])}
                />
            </Tab>
            <Tab eventKey="profile" title="Profile">
                <ChartExample
                    text = "valerik"
                    subtitle = "Some example for valerik "
                    information = {show_data_function(weather, ["pm1", "pm2_5", "pm10", "time"])}
                />
            </Tab>
            <Tab eventKey="contact" title="Contact">
                Tab content for Contact
            </Tab>
        </Tabs>
    );
}

export default Test;


