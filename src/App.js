import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import InnerPage from "./components/InnerPage/InnerPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Team from "./components/Team/Team";

function App() {

    return (
        <div className="App">
            <Header />
            <ScrollToTop />
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/device_cl/:id" element={<InnerPage/>} />
                <Route path="our_team" element={<Team />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
