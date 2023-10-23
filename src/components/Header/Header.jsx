import React, { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.css";
import logo from "../../assets/logo/tumolabslogo.svg";
import navigation_item_logo from "../../assets/logo/menu.svg";
import axios from "axios";
import Basic from "../Test/test";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const handleNavToggle = () => {
        setIsNavExpanded(!isNavExpanded);
    };

    const GoToSection = () => {
        setTimeout(() => {
            const targetElement = document.getElementById("Map");
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
            }
        }, 100); // Delay to Rendering page
    };

    const [devices, setDevices] = useState([]);


    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/devices/")
            .then((response) => {
                setDevices(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);


    const menuData = devices.reduce((acc, data) => {
        const existingMenu = acc.find(menu => menu.title === data.name);

        if (existingMenu) {
            existingMenu.submenus.push({
                title: data.parent_name,
                options: ["Option 1.1.1", "Option 1.1.2"],
                device_id: data.id,
            });
        } else {
            acc.push({
                title: data.name,
                submenus: [
                    {
                        title: data.parent_name,
                        options: ["Option 1.1.1", "Option 1.1.2"],
                        device_id: data.id,
                    },
                ],
            });
        }
        return acc;
    }, []);

    const SubMenuClick = (e) => {
        const toAttribute = e.target.getAttribute('href');
        navigate(toAttribute);
        console.log(location.pathname.indexOf('device'))
        // window.location.reload(false);
    }

    return (
        <nav
            className={`navbar navbar-expand-lg navbar-light ${styles.navigation}`}
        >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo" className={styles.page_logo} />
                </Link>
                <button
                    className={`d-lg-none ${isNavExpanded ? styles.navExpanded : ""} ${
                        styles.navbar_toggler
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={handleNavToggle}
                >
                    <img
                        className={`${styles.menu_icon}`}
                        src={navigation_item_logo}
                        alt={"Menu Bar"}
                    />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <NavItem to="/" label="Home" location={location}/>
                        <NavItem to="/about" label="About" location={location}/>
                        <li>
                            <Link className={`nav-link ${styles.nav_link} nav-item `} to="/#Map" onClick={GoToSection}>Map</Link>
                        </li>
                        <li className={`nav-item dropdown ${styles.nav_link} ${ location.pathname.indexOf('device') === 1 ? styles.active : ""}`}>
                            <a
                                className={`${styles.nav_link} ${styles.root_item} nav-link dropdown-toggle`}
                                href="/#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-auto-close="outside"
                            >
                                Devices
                            </a>
                            <ul
                                className={`dropdown-menu ${styles.drop}`}
                                aria-labelledby="navbarDropdown"
                            >
                                {menuData.map((menu, menuIndex) => (
                                    <li className="dropstart" key={menuIndex}>
                                        <div
                                            className={` ${styles.dropdown__item} dropdown-item dropdown-toggle`}
                                            data-bs-toggle="dropdown"
                                        >
                                            {menu.title}
                                            <ul className={"dropdown-menu"}>
                                                {menu.submenus.map((submenu, submenuIndex) => (
                                                    <li key={submenuIndex}>
                                                        <Link onClick={SubMenuClick} to={`/device/${submenu.device_id}`} className={`dropdown-item ${styles.drop_item}`}>
                                                            {submenu.title} {submenu.device_id}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const NavItem = ({ to, label, location}) => {

    return (
        <li className="nav-item">
            <Link
                to={to}
                className={`nav-link ${styles.nav_link} ${
                    location.pathname === to ? styles.active : ""
                }`}
            >
                {label}
            </Link>
        </li>
    );
};

export default Header;