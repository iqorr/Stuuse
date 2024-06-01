import React from 'react';
import Home from './pages/home/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/registration/Registration.js';

function App() {
    return (
        <Router>    
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </Router>
    );
}

export default App;
