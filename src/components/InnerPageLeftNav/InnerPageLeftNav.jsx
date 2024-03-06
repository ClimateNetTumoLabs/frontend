import React from "react";
import styles from './InnerPageLeftNav.module.css'
import InnerPageFilter from "../InnerPageFilter/InnerPageFilter";
import InnerPageNearbyDevices from "../InnerPageNearbyDevices/InnerPageNearbyDevices";

function InnerPageLeftNav(props) {
    return (
        <div className={`${styles.innerLeftNav} name`}>
            <InnerPageNearbyDevices selected_device_id = {props.selected_device_id}/>
            <InnerPageFilter filterState={props.filterState} filterChange={props.filterChange} 
                startDate={props.startDate}
                setStartDate={props.setStartDate}
                endDate={props.endDate}
                setEndDate={props.setEndDate}
                error = {props.error}    
            />
        </div>
    )
}
export default InnerPageLeftNav;