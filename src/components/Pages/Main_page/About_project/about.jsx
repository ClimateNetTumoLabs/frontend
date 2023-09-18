import React, {useEffect} from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos';
import styles from './about.module.css'

const ScrollingDiv = () => {
    useEffect(() => {
        AOS.init({ duration : 1000 });
        AOS.refresh();
    }, []);

    return (
        <div className="container-fluid">
            <div className={styles.about_us_section}>
                <div data-aos='fade-up' className={`${styles.boxes}`}>
                    <h2 className={styles.title}>
                        What is Lorem Ipsum?
                    </h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div data-aos='fade-up' className={`${styles.boxes}`}>
                    <h2 className={styles.title}>
                        Why do we use it?
                    </h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
        </div>
    );
};

export default ScrollingDiv;