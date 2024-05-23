import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import InnerPage from "./components/InnerPage/InnerPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function App() {
    const { i18n } = useTranslation();
    const location = useLocation();
    const isInnerPage = location.pathname.startsWith("/device");

    return (
        <div className="App">
            <Header />
            <ScrollToTop />
            <Routes>
                <Route path={`/${i18n.language}/`} element={<Home />} />
                <Route path={`/${i18n.language}/about`} element={<About />} />
                <Route path={`/${i18n.language}/device/:id`} element={<InnerPage/>} />
            </Routes>
            <div className={`${isInnerPage ? "footerPadding" : ""}`}>
                <Footer />
            </div>
        </div>
    );
}

export default App;
