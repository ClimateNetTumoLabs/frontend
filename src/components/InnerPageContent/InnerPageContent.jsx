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
                period={props.content}
                weather_data={props.weather_data}
                leftLoad={props.leftLoad}
                setLeftLoad={props.setLeftLoad}
                filterChange={props.filterChange}
                error={props.error}
                setError={props.setError}
                startDate={props.startDate}
				endDate={props.endDate}
                setStartDate={props.setStartDate}
                setEndDate={props.setEndDate}
                filterPressed={props.filterPressed}
				setFilterPressed={props.setFilterPressed}
                filterState={props.filterState}
                selected_device_id={props.selected_device_id}
            />
        </div>
    )
}
export default InnerPageContent;