import React, {useEffect, useState} from "react";
import styles from './InnerPageLeftNav.module.css'
import InnerPageFilter from "../InnerPageFilter/InnerPageFilter";
import InnerPageNearbyDevices from "../InnerPageNearbyDevices/InnerPageNearbyDevices";

function InnerPageLeftNav(props) {
    const last_data = props.weather_data[props.weather_data.length - 1]
    useEffect(() => {
        props.setLeftLoad(false)
    }, [last_data])

    
    return (
        <div className={`${styles.innerLeftNav} name`}>
            <InnerPageNearbyDevices selected_device_id = {props.selected_device_id}
                leftLoad = {props.leftLoad}
                setLeftLoad = {props.setLeftLoad}
            />
            <InnerPageFilter filterState={props.filterState} filterChange={props.filterChange} 
                startDate={props.startDate}
                setStartDate={props.setStartDate}
                endDate={props.endDate}
                setEndDate={props.setEndDate}
                error = {props.error}
                showDatePicker={props.showDatePicker}
                setShowDatePicker={props.setShowDatePicker} 
                handleCloseDatePicker = {props.handleCloseDatePicker}
                setError = {props.setError}
            />
        </div>
    )
}
export default InnerPageLeftNav;