import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import styles from './Banner.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';
// import banner1 from 'https://firebasestorage.googleapis.com/v0/b/testbackground-97a83.appspot.com/o/banner_1.webp?alt=media&token=c1532bb2-0a3a-4469-bf53-c137b525431c';
// import banner2 from 'https://firebasestorage.googleapis.com/v0/b/testbackground-97a83.appspot.com/o/banner_2.webp?alt=media&token=6837e111-807f-4e19-989e-59c86a09e1ab';
// import banner3 from 'https://firebasestorage.googleapis.com/v0/b/testbackground-97a83.appspot.com/o/banner_3.webp?alt=media&token=69931232-fe54-4d6f-b1e6-3ee569524b85';
import '../../i18n';

function Banner() {
    const { t, i18n } = useTranslation();
    const images = useMemo(() => ['https://images-in-website.s3.us-east-1.amazonaws.com/Banner/banner_1.webp', 'https://images-in-website.s3.us-east-1.amazonaws.com/Banner/banner_2.webp', 'https://images-in-website.s3.us-east-1.amazonaws.com/Banner/banner_3.webp'], []);

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
            <Helmet>
                <link rel="preload" href={'https://images-in-website.s3.us-east-1.amazonaws.com/Banner/banner_1.webp'} as="image" />
                <link rel="preload" href={'https://images-in-website.s3.us-east-1.amazonaws.com/Banner/banner_2.webp'} as="image" />
                <link rel="preload" href={'https://images-in-website.s3.us-east-1.amazonaws.com/Banner/banner_3.webp'} as="image" />
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
