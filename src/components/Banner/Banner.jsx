import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './Banner.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
import banner1 from '../../assets/Banner/banner_1.webp';
import banner2 from '../../assets/Banner/banner_2.webp';
import banner3 from '../../assets/Banner/banner_3.webp';
import '../../i18n';

function Banner() {
    const { t, i18n } = useTranslation();
    const images = useMemo(() => [banner1, banner2, banner3], []);

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    // Key to force re-mount of TypeAnimation component on language change
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);

    // Update the animationKey whenever the language changes
    useEffect(() => {
        setAnimationKey((prevKey) => prevKey + 1);
    }, [i18n.language]);

    return (
        <div className={styles.carouselContainer}>
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
                            loading="eager"  // Load critical images eagerly
                            className={styles.carouselImg}
                            src={image}
                            sizes="(max-width: 600px) 100vw, 50vw"
                            alt={`Slide ${idx + 1}`}
                        />
                        <Carousel.Caption className={`${styles.carouselCaption} ${styles.carousel_text_section}`}>
                            <h1 className={`${styles.static_name}`}>{t('banner.title')}</h1>
                            <p className={`${styles.animated_text}`}>
                                <TypeAnimation
                                    key={animationKey} // Use key to force re-mount on language change
                                    sequence={[
                                        t('banner.text.1'),
                                        1000,
                                        t('banner.text.2'),
                                        1000,
                                        t('banner.text.3'),
                                        1000,
                                    ]}
                                    speed={60}
                                    repeat={Infinity}
                                    style={{ whiteSpace: 'pre-line', fontSize: '2em', display: 'flex', justifyContent: 'flex-start' }}
                                />
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Banner;
