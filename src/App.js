import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer/footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Contact from "./Pages/contact/Contact";
import Home from "./Pages/home/Home";
import About from "./Pages/about/About";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
