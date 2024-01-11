import React from 'react';
import mail from '../../assets/Icons/mail.svg'
import location from '../../assets/Icons/location.svg'
import phone from '../../assets/Icons/phone.svg'
import styles from './Footer.module.css'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import './Simple.css'

import L from "leaflet";
import iconUrl from "../../assets/Icons/map-marker.svg";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const center = [40.19185102418464, 44.47937321283996]; // Latitude and longitude for the center of the map

    const customIcon = new L.Icon({
        iconUrl,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
    });
    return (
        <footer className={`text-light" py-2 pb-3 ${styles.footer}`}>
            <div className={`${styles.footer_inner} "container-fluid d-flex justify-content-center"`}>
                <div className='col-md-4 col-12'>
                    <h3 className='mb-4 d-flex'>Social Media</h3>
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
                            <img loading="lazy" src={location} alt="Map Icon" className="icon" />
                            Halabyan 2a, Yerevan, Armenia
                        </p>
                        <p className={styles.company_information}>
                            <a href="tel:+123456789">
                                <img  loading="lazy" src={phone} alt="Phone Icon" className="icon" />
                                +374 10 398413
                            </a>
                        </p>
                        <p className={styles.company_information}>
                            <a href="mailto:info@example.com">
                                <img loading="lazy" src={mail} alt="Email Icon" className="icon" />
                                eutumocc@tumo.org
                            </a>
                        </p>
                    </div>
                </div>
                <div className={`${styles.map_section} col-4"`}>
                    <MapContainer center={center} zoom={13} style={{ width: '100%', height: '200px' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={center} icon={customIcon}>
                            <Popup>
                                Halabyan 2a, Yerevan, Armenia
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <div className="row mt-4 mb-0">
                <div className="col-md-12 text-center">
                    <p className="mb-0">© {currentYear} TUMO Labs. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
