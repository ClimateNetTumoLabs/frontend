import React from "react";
import styles from './InnerPageContent.module.css'
import InnerPageDynamicContent from "../InnerPageDynamicContent/InnerPageDynamicContent";
import InnerPageStaticContent from "../InnerPageStaticContent/InnerPageStaticContent";

function InnerPageContent(props) {
    const last_data = props.weather_data[props.weather_data.length - 1]
    debugger
    return (
        <div className={`${styles.innerContent}`}>
            <InnerPageStaticContent  data = {last_data}/>
            <InnerPageDynamicContent changeable_date = {props.content} weather_data = {props.weather_data}/>
        </div>
    )
}
export default InnerPageContent;