import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Header.module.css";
import logo from "../../assets/logo/tumolabslogo.svg";
import axios from "axios";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const button = useRef(null);
  const [devices, setDevices] = useState([]);
  useEffect(() => window.addEventListener('click', ev => {
    if(button.current && button.current.contains(ev.target)) {setIsNavExpanded(!isNavExpanded)}
    else {setIsNavExpanded(false)}
  }));

  const handleNavToggle = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  // const handleCloseHeader = () => {
  //   setIsNavExpanded(true);
  //   console.log("Some")
  //   if (isNavExpanded) {


  //   }
  // }

  const NavItem = ({ to, label, location }) => {
    return (
        <li className="nav-item">
          <Link
              to={to}
              onClick={SubMenuClick}
              className={`nav-link ${styles.nav_link} ${
                  location.pathname === to ? styles.active : ""
              }`}
          >
            {label}
          </Link>
        </li>
    );
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



  useEffect(() => {
    axios
        .get(`/devices/`)
        .then((response) => {
          setDevices(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }, []);

  const menuData = devices.reduce((acc, data) => {
    const existingMenu = acc.find((menu) => menu.title === data.parent_name);

    if (existingMenu) {
      const existingSubmenu = existingMenu.submenus.find(
          (submenu) => submenu.title === data.name
      );
      if (!existingSubmenu) {
        existingMenu.submenus.push({
          title: data.name,
          device_id: data.generated_id,
        });
      }
    } else {
      acc.push({
        title: data.parent_name,
        submenus: [
          {
            title: data.name,
            device_id: data.generated_id,
          },
        ],
      });
    }
    return acc;
  }, []);

  const SubMenuClick = (e) => {
    setIsNavExpanded(!isNavExpanded);
    const toAttribute = e.target.getAttribute("href");
    navigate(toAttribute);
    window.location.reload(false);
  };

  return (
      <nav
          className={`navbar navbar-expand-lg navbar-light ${styles.navigation}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img loading="lazy" src={logo} alt="Logo" className={styles.page_logo} />
          </Link>
          <div
              className={`d-lg-none ${styles.burgermenu} ${isNavExpanded ? styles.navExpanded : ""} ${
                  styles.navbar_toggler
              }`}
              ref={button}
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={isNavExpanded}
              aria-label="Toggle navigation"
              onClick={handleNavToggle}
          >
            <label htmlFor="check" className={styles.label}>
              <input type="checkbox" className={styles.check} id={"check"}/>
              <span className={styles.line_item}></span>
              <span className={styles.line_item}></span>
              <span className={styles.line_item}></span>
            </label>
          </div>
          <div className={`collapse navbar-collapse ${styles.navigation_bar_for_mobile}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <NavItem to="/" label="Home" location={location} />
              <NavItem to="/about" label="About" location={location} />
              <li>
                <Link
                    className={`nav-link ${styles.nav_link} nav-item `}
                    to="/#Map"
                    onClick={GoToSection}
                >
                  Map
                </Link>
              </li>
              <li
                  className={`nav-item dropdown ${styles.nav_link} ${
                      location.pathname.indexOf("device") === 1 ? styles.active : ""
                  }`}
              >
                <a
                    className={`${styles.nav_link} ${styles.root_item}  nav-link dropdown-toggle`}
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
                                  <Link
                                      onClick={SubMenuClick}
                                      to={`/device_cl/${submenu.device_id}`}
                                      className={`dropdown-item ${styles.drop_item}`}
                                  >
                                    {submenu.title}
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



export default Header;