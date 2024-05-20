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

const changeLanguage = (lng) => {
    const currentLanguage = i18n.language;
    const newPathname = location.pathname.replace(`/${currentLanguage}/`, `/${lng}/`);
    i18n.changeLanguage(lng).then(() => {
        navigate(newPathname);
    });
};


    const handleDeviceClick = (device_id, name) => {
        const deviceUrl = `/${i18n.language}/device/${encodeURIComponent(device_id)}/?${encodeURIComponent(name)}`;
        navigate(deviceUrl);
    };

    const menuData = devices.reduce((acc, data) => {
        let menu = acc.find((menu) => menu.title === data.parent_name);
        if (!menu) {
            menu = { title: data.parent_name, submenus: [] };
            acc.push(menu);
        }
        if (!menu.submenus.some((submenu) => submenu.title === data.name)) {
            menu.submenus.push({ title: data.name, device_id: data.generated_id });
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
                <div className={`collapse navbar-collapse ${styles.navigation_bar_for_mobile}`} id="navbarNav">
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
                            <button className={`nav-link btn ${styles.languageBtn}`} onClick={() => changeLanguage("en")}>
                                Eng
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link btn ${styles.languageBtn}`} onClick={() => changeLanguage("hy")}>
                                Հայ
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;