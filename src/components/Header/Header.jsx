import React, {useState, useEffect, useRef} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.css";
import logo from "../../assets/Logo/logo.svg";
import axios from "axios";
import {useTranslation} from "react-i18next";

const Header = () => {
    const {t, i18n} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [devices, setDevices] = useState([]);
    const buttonRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target) && navRef.current && !navRef.current.contains(event.target)) {
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

    const handleNavItemClick = () => {
        setIsNavExpanded(false);
        if (navRef.current) {
            const collapseElement = navRef.current;
            if (collapseElement.classList.contains('show')) {
                collapseElement.classList.remove('show');
            }
        }
    };

    const NavItem = ({to, label}) => (
        <li className="nav-item">
            <Link
                to={to}
                className={`nav-link ${styles.nav_link} ${location.pathname === to ? styles.active : ""}`}
                onClick={handleNavItemClick}
            >
                {label}
            </Link>
        </li>
    );

    const scrollToMapElement = () => {
        const performScroll = () => {
            const targetElement = document.getElementById("Map");
            if (targetElement) {
                void targetElement.offsetHeight;
                
                const rect = targetElement.getBoundingClientRect();
                const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                
                if (!isVisible) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
                return true;
            }
            return false;
        };

        if (performScroll()) {
            return;
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    if (performScroll()) {
                        observer.disconnect();
                    }
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        let attempts = 0;
        const interval = setInterval(() => {
            attempts++;
            if (performScroll() || attempts > 30) {
                clearInterval(interval);
                observer.disconnect();
            }
        }, 100);

        setTimeout(() => {
            observer.disconnect();
            clearInterval(interval);
        }, 5000);
    };

    useEffect(() => {
        if (location.hash === '#Map') {
            setTimeout(scrollToMapElement, 500);
        }
    }, [location.pathname, location.hash]);

    const GoToSection = () => {
        handleNavItemClick();
        setTimeout(scrollToMapElement, 50);
    };

    const [languageButtonText, setLanguageButtonText] = useState(i18n.language === 'en' ? 'Հայ' : 'Eng');

    const changeLanguage = (lng) => {
        const currentLanguage = i18n.language;
        const newPathname = location.pathname.replace(`/${currentLanguage}/`, `/${lng}/`);
        i18n.changeLanguage(lng).then(() => {
            navigate(newPathname);
            setLanguageButtonText(lng === 'en' ? 'Հայ' : 'Eng');
            handleNavItemClick(); 
        });
    };

    const handleDeviceClick = (device_id, name) => {
        const deviceUrl = `/${i18n.language}/device/${encodeURIComponent(device_id)}/?${decodeURIComponent(name)}`;
        navigate(deviceUrl);
        handleNavItemClick(); // Close the navbar
        // Close all dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]');
        dropdownToggles.forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
        });
    };

    const menuData = devices.reduce((acc, data) => {
        const parentTitle = data[i18n.language === 'hy' ? 'parent_name_hy' : 'parent_name_en'];
        let menu = acc.find((menu) => menu.title === parentTitle);
        if (!menu) {
            menu = {title: parentTitle, submenus: []};
            acc.push(menu);
        }
        const submenuTitle = data[i18n.language === 'hy' ? 'name_hy' : 'name_en'];
        if (!menu.submenus.some((submenu) => submenu.title === submenuTitle)) {
            menu.submenus.push({title: submenuTitle, device_id: data.generated_id});
        }
        return acc;
    }, []);

    useEffect(() => {
        if (navRef.current) {
            if (isNavExpanded) {
                navRef.current.classList.add('show');
            } else {
                navRef.current.classList.remove('show');
            }
        }
    }, [isNavExpanded]);

    return (
        <nav
        className={`navbar navbar-expand-lg navbar-light ${styles.navigation} ${i18n.language === 'hy' ? 'armenianFont' : (i18n.language === 'en' ? 'englishFont' : '')}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to={`/${i18n.language}/`} onClick={handleNavItemClick}>
                    <img loading="lazy" src={logo} alt="Logo" className={styles.page_logo}/>
                </Link>
                <div className={`d-lg-none ${styles.burgermenu}`} ref={buttonRef}>
                    <input type="checkbox" className={styles.check} id="check" checked={isNavExpanded}
                           onChange={handleNavToggle}/>
                    <label htmlFor="check" className={styles.label}>
                        <span className={styles.line_item}></span>
                        <span className={styles.line_item}></span>
                        <span className={styles.line_item}></span>
                    </label>
                </div>
                <div className={`collapse navbar-collapse ${styles.navigation_bar_for_mobile}`} id="navbarNav"
                     ref={navRef}>
                    <ul className="navbar-nav ms-auto">
                        <NavItem to={`/${i18n.language}/about/`} label={t("header.navItems.about")}/>
                        <NavItem to={`/${i18n.language}/diy/`} label={t("header.navItems.diy")}/>
                        <NavItem to={`/${i18n.language}/api/`} label="API"/>
                        <li>
                            <Link className={`nav-link ${styles.nav_link} nav-item`} to={`/${i18n.language}/#Map`}
                                  onClick={GoToSection}>
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
                                        <div className={`dropdown-item dropdown-toggle ${styles.dropdown__item}`}
                                             data-bs-toggle="dropdown">
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
                            <span className={`nav-link ${styles.languageBtn}`}
                                    onClick={() => changeLanguage(i18n.language === 'en' ? 'hy' : 'en')}>
                                {languageButtonText}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;