import React from "react";
import styles from './InnerPageContent.module.css'
import InnerPageDynamicContent from "../InnerPageDynamicContent/InnerPageDynamicContent";
import InnerPageStaticContent from "../InnerPageStaticContent/InnerPageStaticContent";

function InnerPageContent(props) {
    return (
        <div className={`${styles.innerContent}`}>
            <InnerPageStaticContent
                leftLoad={props.leftLoad}
                data={props.data}
            />
            <InnerPageDynamicContent
                weather_data={props.weather_data}
                selected_device_id={props.selected_device_id}
            />
        </div>
    )
}
export default InnerPageContent;