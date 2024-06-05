import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navigation.css'; 
import { Link } from 'react-router-dom'; 

import logo from '../images/logo_transparent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 991) {
            setIsMenuOpen(false);
        }
    }

    const checkIfLogin = () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            return 'Zaloguj się';
        } else {
            return 'Mój profil';
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <nav className="navbar fixed-top navbar-expand-lg py-3" style={{ height: isMenuOpen ? '240px' : 'auto' }}>
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
                <img src={logo} alt="Logo" width="35" height="35" className="d-inline-block align-text-top"/>
                <span className="ms-2">Stuuse</span>
            </Link>

            <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                <ul className="navbar-nav ms-auto" onClick={closeMenu}>
                    <li className="nav-item">
                        <a className='nav-link' href='#free-hours'>
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className='nav-link' href='#events'>
                            Wydarzenia
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className='nav-link' href='#offers'>
                            Oferty
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to="/profile">{checkIfLogin()}</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);
}

export default Navigation;
