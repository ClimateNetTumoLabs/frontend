import React from "react";
import styles from './InnerPageContent.module.css'

function InnerPageContent(props) {
    return (
        <div className={`${styles.innerContent} name`}>
            {props.content}
        </div>
    )
}
export default InnerPageContent;