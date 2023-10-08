import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.css";
import logo from "../../assets/logo/tumolabslogo.svg";
import navigation_item_logo from "../../assets/logo/menu.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavToggle = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const GoToSection = ({ to }) => {
    if (to !== "/") {
      navigate("/");
    }
    const targetElement = document.getElementById("Map");

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const menuData = [
    {
      title: "Yerevan",
      submenus: [
        {
          title: "Tumo Labs",
          options: ["Option 1.1.1", "Option 1.1.2"],
          device_id: "a345ds3",
        },
        {
          title: "Davtashen",
          options: ["Option 1.2.1", "Option 1.2.2"],
          device_id: "s12dd3",
        },
      ],
    },
    {
      title: "Gegharkunik",
      submenus: [
        {
          title: "Sevan",
          options: ["Option 2.1.1", "Option 2.1.2"],
        },
        {
          title: "Gavar",
          options: ["Option 2.2.1", "Option 2.2.2"],
        },
      ],
    },
  ];

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
            <NavItem to="/" label="Home" />
            <NavItem to="/about" label="About" />
            <NavItem to="/contact" label="Contact" />
            {/* <NavItem to='' label='Map' /> */}
            <li className={styles.map_name} onClick={GoToSection}>
              Map
            </li>
            {/*<li className="nav-item dropdown">*/}
            {/*  <a*/}
            {/*    className={`${styles.nav_link} nav-link dropdown-toggle`}*/}
            {/*    href="#"*/}
            {/*    id="navbarDropdown"*/}
            {/*    role="button"*/}
            {/*    data-bs-toggle="dropdown"*/}
            {/*    aria-expanded="false"*/}
            {/*    data-bs-auto-close="outside"*/}
            {/*  >*/}
            {/*    Devices*/}
            {/*  </a>*/}
            {/*  <ul*/}
            {/*    className={`dropdown-menu ${styles.valod}`}*/}
            {/*    aria-labelledby="navbarDropdown"*/}
            {/*  >*/}
            {/*    {menuData.map((menu, menuIndex) => (*/}
            {/*      <li className="dropstart" key={menuIndex}>*/}
            {/*        <div*/}
            {/*          className={` ${styles.dropdown__item} dropdown-item dropdown-toggle`}*/}
            {/*          data-bs-toggle="dropdown"*/}
            {/*        >*/}
            {/*          {menu.title}*/}
            {/*          <ul className={"dropdown-menu"}>*/}
            {/*            {menu.submenus.map((submenu, submenuIndex) => (*/}
            {/*              <li key={submenuIndex}>*/}
            {/*                <Link className="dropdown-item">*/}
            {/*                  {submenu.title}*/}
            {/*                </Link>*/}
            {/*              </li>*/}
            {/*            ))}*/}
            {/*          </ul>*/}
            {/*        </div>*/}
            {/*      </li>*/}
            {/*    ))}*/}
            {/*  </ul>*/}
            {/*</li>*/}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label }) => {
  const location = useLocation();

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
