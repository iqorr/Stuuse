import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="btn btn-logout">
            Wyloguj
        </button>
    );
};

export default Logout;
