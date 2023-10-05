import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Contact from "./components/contact/Contact";
import Home from "./components/home/Home";
import About from "./components/about/About";
import InnerPage from "./components/inner_page/InnerPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/device/:id" element={<InnerPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
