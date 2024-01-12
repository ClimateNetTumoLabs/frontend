import React from "react";
import styles from './InnerPageDynamicContent.module.css'

function InnerPageDynamicContent(props) {
    return (
        <div className={`${styles.InnerPageDynamicContent}`}>
            {props.changeable_date}
        </div>
    )
}
export default InnerPageDynamicContent;