import React, { useState, useEffect } from 'react';
import './Profile.css'; 
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import logo from '../../components/images/logo_transparent.png';
import SectionHeader from '../../components/sectionHeader/SectionHeader';
import Button from '../../components/button/Button';
import Logout from "../../components/logout/Logout";


const Profile = () => {

    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        login: '',
        email: '',
        accountType: '',
        verified: false
    });

    const accountTypeMapping = {
        THIRD_PARTY_COMPANY: 'Firma trzecia',
        PL_EMPLOYEE: 'Pracownik PŁ',
        ADMINISTRATOR: 'Administrator'
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error("No user ID found. Please log in.");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setUserData({
                    name: data.name || 'N/A',
                    lastname: data.lastname || 'N/A',
                    login: data.login,
                    email: data.email,
                    accountType: accountTypeMapping[data.accType] || 'N/A',
                    verified: data.verified ? 'TAK' : 'NIE'
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const renderButtons = () => {
        switch (userData.accountType) {
            case 'Pracownik PŁ':
                return (
                    <>
                        <Link to="/addFreeHour">
                            <Button text="DODAJ GODZINĘ" />
                        </Link>
                        <Link to="/addContent">
                            <Button text="DODAJ TREŚĆ" />
                        </Link>
                    </>
                );
            case 'Administrator':
                return (
                    <Link to="/admin">
                        <Button text="ZARZĄDZAJ" />
                    </Link>
                );
            case 'Firma trzecia':
                return (
                    <Link to="/addContent">
                        <Button text="DODAJ TREŚĆ" />
                    </Link>
                );
            default:
                return null;
        }
    };

    return (
        <main>
          <nav className="navbar py-3">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="Logo" width="35" height="35" className="d-inline-block align-text-top"/>
                <span className="ms-2">Stuuse</span>
              </Link>
                <Logout />
            </div>
          </nav>

          <SectionHeader text="Mój profil"/>

          <div className='my-profile-body'>

                <div className='my-profile-header'>
                    <span>{userData.name} {userData.lastname}</span>
                </div>

                <div className='label-name'>
                    <p>Login:</p>
                </div>


              <div className='label-content mb-3'>
                  <span>{userData.login}</span>
              </div>

              <div className='label-name'>
                    <p>E-mail:</p>
                </div>

              <div className='label-content mb-3'>
                  <span>{userData.email}</span>
              </div>

              <div className='label-name'>
                    <p>Typ konta:</p>
                </div>

              <div className='label-content mb-3'>
                  <span>{userData.accountType}</span>
              </div>

              <div className='label-name'>
                    <p>Zweryfikowany:</p>
                </div>

              <div className='label-content mb-3'>
                  <span>{userData.verified}</span>
              </div>

              {renderButtons()}
          </div>

          <Footer/>
        </main>
    );
}

export default Profile;
