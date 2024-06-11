import React from 'react';
import Home from './pages/home/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.js';
import Registration from './pages/registration/Registration.js';
import Profile from './pages/profile/Profile.js';
import PrivateRoute from "./components/routes/PrivateRoute";
import AddContent from "./pages/addContent/AddContent.js";
import AddFreeHour from "./pages/addFreeHour/AddFreeHour";
import AdminPanel from './pages/administrationPanel/AdminPanel.js';



function App() {
    return (
        <Router>    
            <Routes>
                <Route path="/" element={<Home />} />d
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/addContent" element={<PrivateRoute />}>
                    <Route path="/addContent" element={<AddContent />} />
                </Route>
                <Route path="/addFreeHour" element={<PrivateRoute />}>
                    <Route path="/addFreeHour" element={<AddFreeHour />} />
                </Route>
                <Route path="/registration" element={<Registration />} />

                <Route path="/admin" element={<AdminPanel />} />


                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </Router>
    );
}

export default App;
