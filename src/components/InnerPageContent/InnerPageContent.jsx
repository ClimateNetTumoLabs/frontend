import React, { useState, useEffect } from "react";
import styles from './InnerPageContent.module.css'
import InnerPageDynamicContent from "../InnerPageDynamicContent/InnerPageDynamicContent";
import InnerPageStaticContent from "../InnerPageStaticContent/InnerPageStaticContent";


function InnerPageContent(props) {
    const [loading, setLoading] = useState(true);

    return (
        <div className={`${styles.innerContent}`}>
            <InnerPageStaticContent
                loading={loading}
                setLoading={setLoading}
                leftLoad={props.leftLoad}
                setLeftLoad={props.setLeftLoad}
                data={props.data}
            />
            <InnerPageDynamicContent
                period={props.content}
                weather_data={props.weather_data}
                loading={loading}
                setLoading={setLoading}
                leftLoad={props.leftLoad}
                setLeftLoad={props.setLeftLoad}
                filterState={props.filterState} filterChange={props.filterChange}
                startDate={props.startDate}
                setStartDate={props.setStartDate}
                endDate={props.endDate}
                setEndDate={props.setEndDate}
                error={props.error}
                showDatePicker={props.showDatePicker}
                setShowDatePicker={props.setShowDatePicker}
                handleCloseDatePicker={props.handleCloseDatePicker}
                setError={props.setError}
            />
        </div>
    )
}
export default InnerPageContent;