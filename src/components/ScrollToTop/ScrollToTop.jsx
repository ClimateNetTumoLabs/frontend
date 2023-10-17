import React from 'react';
import styles from "./ScrollToTop.module.css";
import {ReactComponent as Arrow} from "../../assets/icons/up-arrow.svg";

class ScrollToTop extends React.Component {
    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    render() {
        return (
            <button className={styles.button_scroll_top} onClick={this.scrollToTop}>
                <Arrow/>
            </button>
        );
    }
}

export default ScrollToTop;