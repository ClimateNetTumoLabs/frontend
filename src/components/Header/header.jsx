import React, { useState } from 'react';
import { Link, Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './header.module.css'; // Your custom CSS module
import logo from '../../assets/logo/tumolabslogo.svg';
import navigation_item_logo from '../../assets/logo/menu.svg';
import Banner from "../Pages/Main_page/Banner/banner";
import ScrollableSection from "../Pages/Main_page/Project_description/project_description";
import ScrollingDiv from "../Pages/Main_page/About_project/about";
import MapArmenia from "../Pages/Main_page/Map/map";
import InnerPage from "../InnerPage/inner_page";
import AboutUs from '../AboutUs/AboutUs';

const Navigation = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const handleNavToggle = () => {
        setIsNavExpanded(!isNavExpanded);
    };
    // const handleDrLinkClick = (event) => {
    //
    //     event.preventDefault()
    //     console.log(event.target.href)
    //     console.log('Clicked on a link with class "drlink"');
    // };
    const menuData = [
        {
            title: 'Yerevan',
            submenus: [
                {
                    title: 'Tumo Labs',
                    options: ['Option 1.1.1', 'Option 1.1.2'],
                    device_id: "1"
                },
                {
                    title: 'Title 2',
                    options: ['Option 1.2.1', 'Option 1.2.2'],
                    device_id: "2"
                }
            ]
        },
        {
            title: 'Gyumri',
            submenus: [
                {
                    title: 'Submenu 2.1',
                    options: ['Option 2.1.1', 'Option 2.1.2']
                },
                {
                    title: 'Submenu 2.2',
                    options: ['Option 2.2.1', 'Option 2.2.2']
                }
            ]
        }
    ];

    return (
        <Router>
            <nav className={`navbar navbar-expand-lg navbar-light ${styles.navigation}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" className={styles.page_logo} />
                    </Link>
                    <button
                        className={`d-lg-none ${isNavExpanded ? styles.navExpanded : ''} ${styles.navbar_toggler}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={handleNavToggle}>
                        <img className={`${styles.menu_icon}`} src={navigation_item_logo} alt={"Menu Bar"} />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto" key="navbar">
                            <NavItem to="/" label="Home" key="home" />
                            <NavItem to="/about" label="About" key="about" />
                            <NavItem to="/contact" label="Contact" key="contact" />
                            <li className="nav-item dropdown" key="dropdown">
                                <div
                                    className={`${styles.nav_link} nav-link dropdown-toggle`}
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    data-bs-auto-close="outside">
                                    Devices
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {menuData.map((menu, menuIndex) => (
                                        <li key={menuIndex} className="dropstart">
                                            <div
                                                className={` ${styles.dropdown__item} dropdown-item dropdown-toggle`}
                                                data-bs-toggle="dropdown">
                                                {menu.title}
                                                <ul className={`dropdown-menu ${styles.drlink}`}>
                                                    {menu.submenus.map((submenu, submenuIndex) => (
                                                        // <li  key={submenuIndex}>
                                                        //
                                                        //     <Link onClick={handleDrLinkClick}
                                                        //         to={`/about`}
                                                        //         className="">
                                                        //         {submenu.title}
                                                        //     </Link>
                                                        // </li>
                                                        <NavItem to={`device/${submenu.device_id}`} label={`${submenu.title}`} key={submenuIndex} />
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

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/device/:id" element={<InnerPage />} />
            </Routes>
        </Router>
    );
};

const bannerImages = [
    {
        imageName: 'src/assets/images/banner/banner_1.jpeg',
        title: 'IoT Weather Station',
        description: 'Monitor weather conditions in real-time.',
    },
    {
        imageName: '/images/banner/banner_2.jpeg',
        title: 'Temperature and Humidity',
        description: 'Accurate temperature and humidity measurements.',
    },
    {
        imageName: '/images/banner/banner_3.jpeg',
        title: 'Data Visualization',
        description: 'Visualize weather data with interactive charts.',
    },
];

const Home = () => (
    <div className={styles.text_white}>
        <Banner images={bannerImages} />
        <ScrollableSection />
        <MapArmenia />
        <ScrollingDiv />
    </div>
);

const About = () => (
    <div className={styles.text_white}>
        <AboutUs />
    </div>
);

const Contact = () => (
    <div className="d-none">
        Contact Page
    </div>
);

const NavItem = ({ to, label }) => {
    const location = useLocation();

    return (
        <li className="nav-item">
            <Link
                to={to}
                className={`nav-link ${styles.nav_link} ${location.pathname === to ? styles.active : ''}`}>
                {label}
            </Link>
        </li>
    );
};

export default Navigation;
