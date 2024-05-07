import React, {useState, useEffect, useMemo} from 'react';
import { Carousel } from 'react-bootstrap';
import styles from './Banner.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { TypeAnimation } from 'react-type-animation';
import banner1 from '../../assets/Banner/banner_1.jpeg';
import banner2 from '../../assets/Banner/banner_2.jpeg';
import banner3 from '../../assets/Banner/banner_3.jpeg';

function Banner() {
    const images = useMemo(() => [banner1, banner2, banner3], []);

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className={styles.carouselContainer}>
            <Carousel className={styles.carousel_section}
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                fade
            >
                {images.map((images, idx) => (
                    <Carousel.Item key={idx} className={styles.carouselItem}>
                        <img
                            loading="lazy"
                            className={styles.carouselImg}
                            src={`${images}`} 
                            alt={`Slide ${idx + 1}`}
                        />
                        <Carousel.Caption className={`${styles.carouselCaption} ${styles.carousel_text_section}`}>
                            <h1 className={`${styles.static_name}`}>Climate Network: Connecting Armenia through a growing network of real-time climate data. </h1>
                            <p className={`${styles.animated_text}`}>{
                                <TypeAnimation
                                    sequence={[
                                        "Monitor climate changes in real-time.",
                                        1000,
                                        "Accurate temperature and humidity measurements.",
                                        1000,
                                        "Detect the real time climate changes in the regions of Armenia.",
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
