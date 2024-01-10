import React from "react";
import styles from './InnerPageLeftNav.module.css'
import InnerPageFilter from "../InnerPageFilter/InnerPageFilter";
import InnerPageNearbyDevices from "../InnerPageNearbyDevices/InnerPageNearbyDevices";

function InnerPageLeftNav() {
    return (
        <div className={`${styles.innerLeftNav} name`}>
            <InnerPageNearbyDevices />
            <InnerPageFilter />
        </div>
    )
}
export default InnerPageLeftNav;