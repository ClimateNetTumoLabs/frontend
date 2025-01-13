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
import Example from './Example';

function Banner() {
    const { t, i18n } = useTranslation();
    const images = useMemo(() => [ 'https://images-in-website.s3.us-east-1.amazonaws.com/Banner/koghb.png'], []);

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
        // <Example/>
        <div className={styles.carouselContainer}>
            <Helmet>
                <link rel="preload" href={'https://images-in-website.s3.us-east-1.amazonaws.com/Banner/koghb.png'} as="image" />
                {/* <link rel="preload" href={'https://images-in-website.s3.us-east-1.amazonaws.com/Banner/tumo_koghb.jpeg'} as="image" /> */}
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
                            loading="lazy"  // Load critical images eagerly
                            className={styles.carouselImg}
                            src={image}
                            alt={`Slide ${idx + 1}`}
                        />
                        
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Banner;
