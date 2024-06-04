import React from 'react';
import Home from './pages/home/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.js';
import Registration from './pages/registration/Registration.js';
import Profile from './pages/profile/Profile.js';
import PrivateRoute from "./components/routes/PrivateRoute";


function App() {
    return (
        <Router>    
            <Routes>
                <Route path="/" element={<Home />} />d
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </Router>
    );
}

export default App;
