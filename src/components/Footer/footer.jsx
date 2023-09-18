import React from 'react';
import mail from '../../assets/icons/mail.svg'
import location from '../../assets/icons/location.svg'
import phone from '../../assets/icons/phone.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from './footer.module.css'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-light py-5 pb-3">
            <div className="container-fluid d-flex justify-content-center">
                <div className='col-6'>
                    <h3 className='mb-4 d-flex '>Social Media</h3>
                    <div className={`social-icon ${styles.social_icons_block}`}>
                        <a className={styles.social_icon} href="https://www.facebook.com/tumolabs/"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a className={styles.social_icon} href="https://www.youtube.com/channel/UC1spAfywefFdHxrKWLZaDuA"><FontAwesomeIcon icon={faYoutube} /></a>
                        <a className={styles.social_icon} href="https://www.instagram.com/tumolabs/"><FontAwesomeIcon icon={faInstagram} /></a>
                    </div>
                </div>
                <div className="col-6 justify-content-center d-flex">
                    <div className="col">
                        <p className={styles.company_information}>
                            <img src={location} alt="Map Icon" className="icon" />
                             123 Street, City, Country
                        </p>
                        <p className={styles.company_information}>
                            <a href="tel:+123456789">
                                <img src={phone} alt="Phone Icon" className="icon" />
                                +1 234 567 890
                            </a>
                        </p>
                        <p className={styles.company_information}>
                            <a href="mailto:info@example.com">
                                <img src={mail} alt="Email Icon" className="icon" />
                                info@example.com
                            </a>
                        </p>
                    </div>
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
