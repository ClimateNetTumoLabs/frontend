import React, { useState } from "react";
import styles from './InnerPageContent.module.css'
import InnerPageDynamicContent from "../InnerPageDynamicContent/InnerPageDynamicContent";
import InnerPageStaticContent from "../InnerPageStaticContent/InnerPageStaticContent";

function InnerPageContent(props) {
     const [loading, setLoading] = useState(false);
    return (
        <div className={`${styles.innerContent}`}>
            <InnerPageStaticContent
                loading={loading}
                setLoading={setLoading}
                problematicDeviceIds={["Maralik", "Ashotsk", "Gavar", "Yerazgavors", "Artsvaberd", "Chambarak", "Areni", "Amasia", "Panik",
                "Մարալիկ", "Աշոցք", "Գավառ", "Երազգավորս", "Արծվաբերդ", "Ճամբարակ", "Արենի", "Ամասիա", "Փանիկ"]}
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