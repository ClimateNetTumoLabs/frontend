import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './banner.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { TypeAnimation } from 'react-type-animation';

function Banner() {
    const images = [
        {
          imageName: "/images/banner/banner_1.jpeg",
          title: "IoT Weather Station",
          description: "Monitor weather conditions in real-time..",
        },
        {
          imageName: "/images/banner/banner_2.jpeg",
          title: "Temperature and Humidity",
          description: "Accurate temperature and humidity measurements.",
        },
        {
          imageName: "/images/banner/banner_3.jpeg",
          title: "Data Visualization",
          description: "Visualize weather data with interactive charts.",
        },
      ];
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className={styles.carouselContainer}>
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    interval={null}
                    fade
                >
                    {images.map((imageData, idx) => (
                        <Carousel.Item key={idx} className={styles.carouselItem}>
                            <img
                                className={styles.carouselImg}
                                src={`${imageData.imageName}`} // Use the path relative to the public folder
                                alt={`Slide ${idx + 1}`}
                            />
                            <Carousel.Caption className={`${styles.carouselCaption} ${styles.carousel_text_section}`}>
                                <h3 className={`${styles.static_name}`}>TUMO Labs Weather Station : </h3>
                                <p className={`${styles.animated_text}`}>{
                                    <TypeAnimation
                                        sequence={[
                                            "Monitor weather conditions in real-time.",
                                            1000,
                                            " Accurate temperature and humidity measurements.",
                                            1000,
                                            "Visualize weather data with interactive charts.",
                                            1000,
                                        ]}
                                        speed={60}
                                        repeat={Infinity}
                                        style={{ whiteSpace: 'pre-line', fontSize: '2em',  display: 'flex', justifyContent: 'flex-start'}}
                                    />
                                }
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
    );
}

export default Banner;
