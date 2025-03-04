import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import InnerPage from "./components/InnerPage/InnerPage";
import DIY from "./components/DIY/DIY";
import API from "./components/API/API";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from "./components/NotFound/NotFound"
import { useTranslation } from 'react-i18next';
import PrivacyPolicy from "./components/PrivacyAndpolicy/PrivacyAndPolicy";

function App() {
    const { i18n } = useTranslation();

    const routes = [
        { path: "/", component: <Home /> },
        { path: `/${i18n.language}/`, component: <Home /> },
        { path: `/${i18n.language}/diy`, component: <DIY /> },
        { path: `/${i18n.language}/api`, component: <API /> },
        { path: `/${i18n.language}/about`, component: <About /> },
        { path: `/${i18n.language}/device/:id`, component: <InnerPage /> },
        { path: "/privacy-policy", component: <PrivacyPolicy /> }
    ];

    return (
        <div className="App">
            <ScrollToTop/>

            {/* Use Layout component to wrap all routes that need Header and Footer */}
            <Routes>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={<Layout>{route.component}</Layout>} />
                ))}
                <Route path="*" element={<NotFound />} />
                <Route path={`/${i18n.language}//*`} element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
