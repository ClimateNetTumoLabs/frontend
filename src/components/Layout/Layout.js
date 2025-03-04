// src/components/Layout/Layout.js
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CookieManager from "../CookieManager/CookieManager";
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    // Check if the current route is a wildcard route (404 page)
    const isNotFoundPage = location.pathname === "*" || location.pathname.includes("/*");
    const isInnerPage = location.pathname.startsWith("/device");

    return (
        <>
            {/* Conditionally render Header and Footer */}
            {!isNotFoundPage && <Header />}
            {!isNotFoundPage && <CookieManager />}
            <main>{children}</main>
            <div className={`${isInnerPage ? "footerPadding" : ""}`}>
                {!isNotFoundPage && <Footer/>}
            </div>
        </>
    );
};

export default Layout;
