import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PermissionsRoute = ({ allowedRoles }) => {
    // const token = localStorage.getItem('token');
    const typeOfUser = localStorage.getItem('typeOfUser');

    return allowedRoles.includes(typeOfUser) ? <Outlet /> : <Navigate to="/" />;
};

export default PermissionsRoute;