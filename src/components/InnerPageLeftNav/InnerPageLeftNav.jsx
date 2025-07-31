import React from "react";
import styles from './InnerPageLeftNav.module.css'
import InnerPageFilter from "../InnerPageFilter/InnerPageFilter";
import InnerPageNearbyDevices from "../InnerPageNearbyDevices/InnerPageNearbyDevices";

function InnerPageLeftNav({device, ...props}) {
    return (
        <div className={`${styles.innerLeftNav} name`}>
            <InnerPageNearbyDevices
                device={device}
                selected_device_id={props.selected_device_id}
                leftLoad={props.leftLoad}
                setLeftLoad={props.setLeftLoad}
				filterChange={props.filterChange}
                error={props.error}
            />
        </div>
    )
}
export default InnerPageLeftNav;