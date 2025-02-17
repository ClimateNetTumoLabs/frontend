import React from 'react';
import mail from '../../assets/Icons/mail.svg'
import location from '../../assets/Icons/location.svg'
import phone from '../../assets/Icons/phone.svg'
import styles from './Footer.module.css'
import './Simple.css'
import { useTranslation } from "react-i18next";
import  "../../i18n";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();

    return (
        <footer className={`text-light ${styles.footer}`}>

            <div className={`${styles.footer_inner} "container-fluid d-flex justify-content-center"`}>
                <div className='col-md-4 col-12'>
                    <h3 className='mb-4 d-flex'>{t('footer.title')}</h3>
                    <div className={`social-icon ${styles.social_icons_block}`}>
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/tumolabs/" target="_blank" rel="noreferrer">
                                    <i className="fab fa-facebook-f icon"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/tumolabs/" target="_blank" rel="noreferrer">
                                    <i className="fab fa-instagram icon"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/channel/UC1spAfywefFdHxrKWLZaDuA" target="_blank" rel="noreferrer">
                                    <i className="fab fa-youtube icon"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4 col-12 justify-content-center d-flex">
                    <div className="col">
                        <p className={styles.company_information}>
                            <a href="https://www.google.com/maps/place/2a+Halabyan+St,+Yerevan+0038/@40.1918461,44.4793715,17z/data=!3m1!4b1!4m6!3m5!1s0x406abd74e53e311d:0x891208fe54bb63d6!8m2!3d40.1918461!4d44.4793715!16s%2Fg%2F11t7d495t1?entry=ttu" target="_blank" rel="noreferrer">
                            <img loading="lazy" src={location} alt="Map Icon" className="icon" />
                            {t('footer.address')}
                            </a>
                        </p>
                        <p className={styles.company_information}>
                            <a href="tel:+37410398413">
                                <img  loading="lazy" src={phone} alt="Phone Icon" className="icon" />
                                +374 10 398413
                            </a>
                        </p>
                        <p className={styles.company_information}>
                            <a href="mailto:labs@tumo.org">
                                <img loading="lazy" src={mail} alt="Email Icon" className="icon" />
                                labs@tumo.org
                            </a>
                        </p>
                    </div>
                </div>
                <div className={`${styles.map_section} col-4"`}>
                    <p className={styles.company_information}>
                        <a href="https://tumolabs.am/en/upcoming-projects/">
                            {t('footer.projects.upcomingProjects')}
                        </a>
                    </p>
                    <p className={styles.company_information}>
                        <a href="https://tumolabs.am/en/past-projects/">
                            {t('footer.projects.pastProjects')}
                        </a>
                    </p>
                </div>
            </div>
            <div className="row  mb-0">
                <div className="col-md-12 text-center">
                    <p className="mb-0 d-none d-md-block">
                      © {currentYear} {t('footer.rightsReserved')} | Version 1.3
                    </p>
                    <p className="mb-0 d-block d-md-none">
                      © {currentYear} {t('footer.rightsReserved')}
                    </p>
                    <p className="mb-0 d-block d-md-none">Version 1.3</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
