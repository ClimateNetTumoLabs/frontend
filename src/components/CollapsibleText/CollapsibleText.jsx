import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useCollapse } from 'react-collapsed';
import styles from './CollapsibleText.module.css'
import {Markup} from "interweave";

const CollapsibleText = forwardRef(({ text, point }, ref) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (
        <div className={`collapsible card ${styles.collapse_section}`}>
            <div className={`cart-body ${styles.cart_body}`}>
                <div {...getToggleProps()} ref={ref}>
                    <span className={styles.point}>{point}</span>
                    <span className={`${styles.icon} ${isExpanded ? styles.hide : ''}`}></span>
                </div>
            </div>
            <div {...getCollapseProps()} className={styles.description}>
                <Markup className={`card-text ${styles.card}`} content={text} />
            </div>
        </div>
    );
});

CollapsibleText.propTypes = {
    text: PropTypes.string.isRequired,
    maxCharacters: PropTypes.number,
};

CollapsibleText.defaultProps = {
    maxCharacters: 100,
};

export default CollapsibleText;
