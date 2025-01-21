import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import styles from "./Description.module.css";

import aws from '../../assets/Logo/aws.png'
import tumo from '../../assets/Logo/tumo.png'
import Team from "../Team/Team";
import { useTranslation } from "react-i18next";
import  "../../i18n";

const Description = () => {
    const { t } = useTranslation();
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true      // Ensures animation runs only once
        });
    }, []);

    return (
        <div className={`${styles.Description_section} container-fluid`}>
            <div className={` container ${styles.about_us_section}`}>
                <div>
                    <div data-aos="fade-up" className={`${styles.boxes}`}>
                        <h2 className={styles.title}>{t('description.sections.0.title')}</h2>
                        <p className={"mb-3"}> {t('description.sections.0.content')}</p>
                        <div className={`d-flex mb-3 ${styles.partner_item}`}>
                            <p className={`${styles.partners} ${styles.partner_link}`}>
                                <a href='https://aws.amazon.com/' >
                                    <img loading="lazy" className={`${styles.partner_logo}`} src={aws} alt={"AWS Logo"}/>
                                </a>
                            </p>
                            <p>{t('description.sections.0.partner1')}</p>
                        </div>
                        <div className={`d-flex ${styles.partner_item} `}>
                            <p className={`${styles.partners} ${styles.partner_link}`}>
                                <a href='https://armenia.tumo.org/'>
                                    <img  loading="lazy" className={`${styles.partner_logo}`} src={tumo} alt={"TUMO Logo"}/>
                                </a>
                            </p>
                            <p>
                                {t('description.sections.0.partner2')}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div data-aos="fade-up" className={`${styles.boxes}`}>
                        <h2 className={styles.title}>{t('description.sections.1.title')}</h2>
                        <p>
                            {t('description.sections.1.content')}
                        </p>
                        <Team/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Description;
