import React from 'react';
import Home from './pages/home/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.js';
import Registration from './pages/registration/Registration.js';
import Profile from './pages/profile/Porfile.js';


function App() {
    return (
        <Router>    
            <Routes>
                <Route path="/" element={<Home />} />d
                <Route path="/login" element={<Login />} />
                {/*<Route path="/myProfile" element={<PrivateRoute />}>*/}
                {/*    <Route path="/myProfile" element={<MyProfile />} />*/}
                {/*</Route>*/}
                <Route path="/registration" element={<Registration />} />
                <Route path="/profile" element={<Profile />} />
           
            </Routes>
        </Router>
    );
}

export default App;
