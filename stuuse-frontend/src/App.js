import React from 'react';
import Home from './pages/home/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.js';
import Registration from './pages/registration/Registration.js';
import Profile from './pages/profile/Profile.js';
import PrivateRoute from "./components/routes/PrivateRoute";
import AddContent from "./pages/addContent/AddContent.js";
import AddFreeHour from "./pages/addFreeHour/AddFreeHour";
import PermissionsRoute from "./components/routes/PermissionsRoute";
import AdminPanel from "./pages/administration_Panel/AdminPanel";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route element={<PermissionsRoute allowedRoles={['ADMINISTRATOR']} />}>
                        <Route path="/admin" element={<AdminPanel />} />
                    </Route>
                    <Route element={<PermissionsRoute allowedRoles={['PL_EMPLOYEE']} />}>
                        <Route path="/addContent" element={<AddContent />} />
                        <Route path="/addFreeHour" element={<AddFreeHour />} />
                    </Route>
                    <Route element={<PermissionsRoute allowedRoles={['THIRD_PARTY_COMPANY']} />}>
                        <Route path="/addContent" element={<AddContent />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
