import React from 'react';
import mail from '../../assets/Icons/mail.svg'
import location from '../../assets/Icons/location.svg'
import phone from '../../assets/Icons/phone.svg'
import styles from './Footer.module.css'
// import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import './Simple.css'
import { useTranslation } from "react-i18next";
import  "../../i18n";

// import L from "leaflet";
// import iconUrl from "../../assets/Icons/map-marker.svg";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();
    // const center = [40.19185102418464, 44.47937321283996]; // Latitude and longitude for the center of the map
    //
    // const customIcon = new L.Icon({
    //     iconUrl,
    //     iconSize: [30, 30],
    //     iconAnchor: [15, 15],
    //     popupAnchor: [0, -15],
    // });
    return (
        <footer className={`text-light" ${styles.footer}`}>
            <div className={`${styles.footer_inner} "container-fluid d-flex justify-content-center"`}>
                <div className='col-md-4 col-12'>
                    <h3 className='mb-4 d-flex'>{t('footer.title')}</h3>
                    <div className={`social-icon ${styles.social_icons_block}`}>
                        {/*<a className={styles.social_icon} href="https://www.facebook.com/tumolabs/"><FontAwesomeIcon icon={faFacebook} /></a>*/}
                        {/*<a className={styles.social_icon} href="https://www.youtube.com/channel/UC1spAfywefFdHxrKWLZaDuA"><FontAwesomeIcon icon={faYoutube} /></a>*/}
                        {/*<a className={styles.social_icon} href="https://www.instagram.com/tumolabs/"><FontAwesomeIcon icon={faInstagram} /></a>*/}
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/tumolabs/">
                                    <i className="fab fa-facebook-f icon"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/tumolabs/">
                                    <i className="fab fa-instagram icon"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/channel/UC1spAfywefFdHxrKWLZaDuA">
                                    <i className="fab fa-youtube icon"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4 col-12 justify-content-center d-flex">
                    <div className="col">
                        <p className={styles.company_information}>
                            <a href="https://www.google.com/maps/place/2a+Halabyan+St,+Yerevan+0038/@40.1918461,44.4793715,17z/data=!3m1!4b1!4m6!3m5!1s0x406abd74e53e311d:0x891208fe54bb63d6!8m2!3d40.1918461!4d44.4793715!16s%2Fg%2F11t7d495t1?entry=ttu">
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
                            <a href="mailto:eutumocc@tumo.org">
                                <img loading="lazy" src={mail} alt="Email Icon" className="icon" />
                                eutumocc@tumo.org
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
                    {/*<MapContainer center={center} zoom={13} style={{ width: '100%', height: '200px' }}>*/}
                    {/*    <TileLayer*/}
                    {/*        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                    {/*        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
                    {/*    />*/}
                    {/*    <Marker position={center} icon={customIcon}>*/}
                    {/*        <Popup>*/}
                    {/*            Halabyan 2a, Yerevan, Armenia*/}
                    {/*        </Popup>*/}
                    {/*    </Marker>*/}
                    {/*</MapContainer>*/}
                </div>
            </div>
            <div className="row  mb-0">
                <div className="col-md-12 text-center">
                    <p className="mb-0">© {currentYear} {t('footer.rightsReserved')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
