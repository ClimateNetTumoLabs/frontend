import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import InnerPage from "./components/InnerPage/InnerPage";
import DIY from "./components/DIY/DIY";
import API from "./components/API/API";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useTranslation } from 'react-i18next';
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import CookieManager from "./components/CookieManager/CookieManager";
import NotFound from "./components/NotFound/NotFound";
import { useMemo } from 'react';

function App() {
    const { i18n } = useTranslation();
    const location = useLocation();
    const isInnerPage = location.pathname.startsWith("/device");

    const isKnownRoute = useMemo(() => {
        const normalizePath = (path) => path.replace(/\/+$/, "");

        const pathname = normalizePath(location.pathname);
      
        const validPaths = [
          `/${i18n.language}`,
          `/${i18n.language}/diy`,
          `/${i18n.language}/api`,
          `/${i18n.language}/about`,
          `/${i18n.language}/privacy-policy`
        ];
      
        const isDeviceRoute = new RegExp(`^/${i18n.language}/device/[^/]+/?$`).test(pathname);
      
        return validPaths.includes(pathname) || isDeviceRoute;
      }, [location.pathname, i18n.language]);

    return (
        <div className="App" style={{minHeight: '100vh'}}>
            <CookieManager/>
            {isKnownRoute && <Header/>}
            <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Navigate to={`/${i18n.language}/`} replace />} />
                <Route path={`*`} element={<NotFound/>}/>
                <Route path={`/${i18n.language}//*`} element={<NotFound/>}/>
                <Route path={`/${i18n.language}/`} element={<Home/>}/>
                <Route path={`/${i18n.language}/diy`} element={<DIY/>}/>
                <Route path={`/${i18n.language}/api`} element={<API/>}/>
                <Route path={`/${i18n.language}/about`} element={<About/>}/>
                <Route path={`/${i18n.language}/device/`} element={<NotFound/>}/>
                <Route path={`/${i18n.language}/device/:id`} element={<InnerPage/>}/>
                <Route path={`/${i18n.language}/privacy-policy`} element={<PrivacyPolicy/>}/>
            </Routes>
            {isKnownRoute && (<div className={`${isInnerPage ? "footerPadding" : ""}`}>
                <Footer/>
            </div>)}
            
        </div>
    );
}

export default App;
