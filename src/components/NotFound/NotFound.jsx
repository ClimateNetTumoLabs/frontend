import React from 'react'
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./NotFound.module.css";
import logo from "../../assets/Logo/logo.svg";

const NotFound = () => {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    return (
        <div style={{height: '100vh', display: 'flex', flexDirection:'column'}}>
            <nav
                className={`navbar navbar-expand-lg navbar-light ${styles.navigation} ${i18n.language === 'hy' ? 'armenianFont' : (i18n.language === 'en' ? 'englishFont' : '')}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/${i18n.language}/`}>
                        <img loading="lazy" src={logo} alt="Logo" className={styles.page_logo} />
                    </Link>
                </div>
            </nav>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height:'100%', textAlign: "center" }}
            >

                <h1 className="mb-3 display-3">404</h1>
                <p className="mb-4">{t('notfound.pageText')}</p>
                <Button onClick={()=> navigate(`/${i18n.language}/`)} className={`mt-2 btn ${styles.to_home_buttton}`}>
                    {t('notfound.buttonText')}
                </Button>
            </div>
        </div>
    );
}

export default NotFound