import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.css";
import logo from "../../assets/Logo/tumolabslogo.svg";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [devices, setDevices] = useState([]);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsNavExpanded(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        axios.get(`/device_inner/list/`)
            .then((response) => setDevices(response.data))
            .catch((error) => console.error("Error fetching devices:", error));
    }, []);

    const handleNavToggle = () => setIsNavExpanded(!isNavExpanded);

    const NavItem = ({ to, label }) => (
        <li className="nav-item">
            <Link to={to} className={`nav-link ${styles.nav_link} ${location.pathname === to ? styles.active : ""}`}>
                {label}
            </Link>
        </li>
    );

    const GoToSection = () => {
        setTimeout(() => {
            const targetElement = document.getElementById("Map");
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
            }
        }, 100);
    };

    const [languageButtonText, setLanguageButtonText] = useState(i18n.language === 'en' ? 'Հայ' : 'Eng');

    const changeLanguage = (lng) => {
        const currentLanguage = i18n.language;
        const newPathname = location.pathname.replace(`/${currentLanguage}/`, `/${lng}/`);
        i18n.changeLanguage(lng).then(() => {
            navigate(newPathname);
            setLanguageButtonText(lng === 'en' ? 'Հայ' : 'Eng');
        });
    };

    const handleDeviceClick = (device_id, name) => {
        const deviceUrl = `/${i18n.language}/device/${encodeURIComponent(device_id)}/?${encodeURIComponent(name)}`;
        navigate(deviceUrl);
        setIsNavExpanded(false); // Close the navbar
    };

    const menuData = devices.reduce((acc, data) => {
        const parentTitle = t(`devices.parentNames.${data.parent_name}`);
        let menu = acc.find((menu) => menu.title === parentTitle);
        if (!menu) {
            menu = { title: parentTitle, submenus: [] };
            acc.push(menu);
        }
        const submenuTitle = t(`devices.deviceNames.${data.name}`);
        if (!menu.submenus.some((submenu) => submenu.title === submenuTitle)) {
            menu.submenus.push({ title: submenuTitle, device_id: data.generated_id });
        }
        return acc;
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${styles.navigation}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to={`/${i18n.language}/`}>
                    <img loading="lazy" src={logo} alt="Logo" className={styles.page_logo} />
                </Link>
                <div
                    className={`d-lg-none ${styles.burgermenu} ${isNavExpanded ? styles.navExpanded : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={isNavExpanded ? "true" : "false"}
                    aria-label="Toggle navigation"
                    ref={buttonRef}
                    onClick={handleNavToggle}
                >
                    <label htmlFor="check" className={styles.label}>
                        <input type="checkbox" className={styles.check} id="check" />
                        <span className={styles.line_item}></span>
                        <span className={styles.line_item}></span>
                        <span className={styles.line_item}></span>
                    </label>
                </div>
                <div className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <NavItem to={`/${i18n.language}/`} label={t("header.navItems.home")} />
                        <NavItem to={`/${i18n.language}/about/`} label={t("header.navItems.about")} />
                        <li>
                            <Link className={`nav-link ${styles.nav_link} nav-item`} to={`/${i18n.language}/#Map`} onClick={GoToSection}>
                                {t("header.navItems.map")}
                            </Link>
                        </li>
                        <li className={`nav-item dropdown ${styles.nav_link} ${location.pathname.includes("device") ? styles.active : ""}`}>
                            <a
                                className={`nav-link dropdown-toggle ${styles.nav_link} ${styles.root_item}`}
                                href="/#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-auto-close="outside"
                            >
                                {t('header.navItems.devices')}
                            </a>
                            <ul className={`dropdown-menu ${styles.drop}`} aria-labelledby="navbarDropdown">
                                {menuData.map((menu, menuIndex) => (
                                    <li className="dropstart" key={menuIndex}>
                                        <div className={`dropdown-item dropdown-toggle ${styles.dropdown__item}`} data-bs-toggle="dropdown">
                                            {menu.title}
                                            <ul className="dropdown-menu">
                                                {menu.submenus.map((submenu, submenuIndex) => (
                                                    <li key={submenuIndex}>
                                                        <button
                                                            onClick={() => handleDeviceClick(submenu.device_id, submenu.title)}
                                                            className={`dropdown-item ${styles.drop_item}`}
                                                        >
                                                            {submenu.title}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link btn ${styles.languageBtn}`} onClick={() => changeLanguage(i18n.language === 'en' ? 'hy' : 'en')}>
                                {languageButtonText}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
