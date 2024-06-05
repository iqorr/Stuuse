import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="btn btn-logout">
            <i class="bi bi-box-arrow-left"></i>
        </button>
    );
};

export default Logout;
