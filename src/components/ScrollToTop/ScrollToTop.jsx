import React, {useEffect, useState} from 'react';
import styles from "./ScrollToTop.module.css";
import {ReactComponent as Arrow} from "../../assets/Icons/up-arrow.svg";

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(false);
            } else {
                setShowButton(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
    },);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button className={`${styles.button_scroll_top} ${showButton ? styles.hide : styles.show} `} onClick={scrollToTop}>
            <Arrow/>
        </button>
    );
}

export default ScrollToTop;