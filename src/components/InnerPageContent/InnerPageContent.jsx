import React, { useState, useEffect } from "react";
import styles from './InnerPageContent.module.css'
import InnerPageDynamicContent from "../InnerPageDynamicContent/InnerPageDynamicContent";
import InnerPageStaticContent from "../InnerPageStaticContent/InnerPageStaticContent";

function InnerPageContent(props) {
    const last_data = props.weather_data[props.weather_data.length - 1]
    console.log(props.content)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
    }, [last_data])
    return (
        <div className={`${styles.innerContent}`}>
            <InnerPageStaticContent  data = {last_data}
                loading={loading}
                setLoading={setLoading}
            />
            <InnerPageDynamicContent period = {props.content} weather_data = {props.weather_data}
                loading={loading}
                setLoading={setLoading}
            />
        </div>
    )
}
export default InnerPageContent;