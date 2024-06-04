import React, { useState } from 'react';
import './Profile.css'; 
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../../components/images/logo_transparent.png';
import SectionHeader from '../../components/sectionHeader/SectionHeader';
import Button from '../../components/button/Button';


const Profile = () => {

  return (
    <main>
      <nav className="navbar py-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" width="35" height="35" className="d-inline-block align-text-top"/>
            <span className="ms-2">Stuuse</span>
          </Link>
        </div>
      </nav>

      <SectionHeader text="Mój profil"/>

      <div className='my-profile-body'>

            <div className='my-profile-header'>
                {/* Get first and surname from database */}
                <span>Jan Kowalski</span>
            </div>

            <div className='label-name'>
                <p>Login:</p>
            </div>

            
            <div className='label-content mb-3'>
                {/* Get nickname from database */}
                <span>Jkowalski</span>
            </div>

            <div className='label-name'>
                <p>E-mail:</p>
            </div>

            <div className='label-content mb-3'>
                {/* Get email from database */}
                <span>Jkowalski12@gmail.com</span>
            </div>

            <div className='label-name'>
                <p>Typ konta:</p>
            </div>

            <div className='label-content mb-3'>
              {/* Get account type from database */}
                <span>Frima Trzecia</span>
            </div>

            <div className='label-name'>
                <p>Zweryfikowany:</p>
            </div>

            <div className='label-content mb-3'>
              {/* Get account verified status from database */}
                <span>TAK</span>
            </div>

            <Button text="ZARZĄDZAJ"/>
      </div>
      
      <Footer/>
    </main>
  );
}

export default Profile;
