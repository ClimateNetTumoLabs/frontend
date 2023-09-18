import React from 'react';
import Navigation from "./components/Header/header";
import Footer from "./components/Footer/footer";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {

    return (
        <div className="App">
            <Navigation />
            <Footer/>
        </div>
    );
}

export default App;