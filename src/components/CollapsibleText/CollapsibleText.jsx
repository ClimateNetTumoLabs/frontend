import React from "react";
import PropTypes from "prop-types";
import { useCollapse } from 'react-collapsed';
import styles from './CollapsibleText.module.css'

const CollapsibleText = ({ text, maxCharacters, point}) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (
        <div className={`collapsible card ${styles.collapse_section}`}>
            <div className={`cart-body ${styles.cart_body}`}>
                <div{...getToggleProps()}>
                    <span className={styles.point}>{point}</span>
                    <span className={`${styles.icon } ${isExpanded ? styles.hide : ''}`}></span>
                </div>
            </div>
            {text.length > maxCharacters && (
                <div {...getCollapseProps()} className={styles.description}>

                    <p className="card-text">{text}</p>
                </div>
            )}
        </div>
    );
};

CollapsibleText.propTypes = {
    text: PropTypes.string.isRequired,
    maxCharacters: PropTypes.number,
};

CollapsibleText.defaultProps = {
    maxCharacters: 100,
};

export default CollapsibleText;
