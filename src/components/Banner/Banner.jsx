import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import styles from './Banner.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import Example from './Example';

function Banner() {
    const { t, i18n } = useTranslation();
    const images = useMemo(() => ['https://images-in-website.s3.us-east-1.amazonaws.com/Banner/tumo_koghb.webp'], []);
    const [index, setIndex] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false); // State to track image load

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
        setIsImageLoaded(false); // Reset image load state on new slide
    };

    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    useEffect(() => {
        setAnimationKey((prevKey) => prevKey + 1);
    }, [i18n.language]);

    const isArmenian = i18n.language === 'hy'; // Check if the language is Armenian

    return (
        // <Example/>
        <div className={styles.carouselContainer}>
            <Helmet>
                <link
                    rel="preload"
                    href="https://images-in-website.s3.us-east-1.amazonaws.com/Banner/tumo_koghb.webp"
                    as="image"
                />
            </Helmet>
            <Carousel
                className={styles.carousel_section}
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                fade
            >
                {images.map((image, idx) => (
                    <Carousel.Item key={idx} className={styles.carouselItem}>
                        <img
                            loading="eager"
                            className={styles.carouselImg}
                            src={image}
                            alt={`Slide ${idx + 1}`}
                            onLoad={() => setIsImageLoaded(true)} // Set image as loaded
                        />
                        {isImageLoaded && (
                            <Carousel.Caption
                                className={`${styles.captionContainer} ${isArmenian ? styles.armenianStyle : styles.defaultStyle} ${
                                    isArmenian ? styles.armenianMobile : ''
                                }`}
                            >
                                <div className={styles.leftCaption}></div>
                                <div className={styles.rightCaption}>
                                    {t('banner.title')}<br />{t('banner.title2')}
                                </div>
                            </Carousel.Caption>
                        )}
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Banner;
