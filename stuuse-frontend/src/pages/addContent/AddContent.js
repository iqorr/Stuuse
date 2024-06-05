import React, { useState, useEffect } from 'react';
import './AddContent.css'; 
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../../components/images/logo_transparent.png';
import Button from '../../components/button/Button';
import SectionHeader from '../../components/sectionHeader/SectionHeader';

const AddContent = () => {

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

  const [contentType, setContentType] = useState('');

  useEffect(() => {
    if (userData.accountType === 'Firma trzecia') {
      setContentType('special-offer');
    } else if (userData.accountType === 'Pracownik PŁ') {
      setContentType('university-event');
    }
  }, [userData.accountType]);

  const handleContentTypeChange = (event) => {
    setContentType(event.target.value);
  };

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

      <SectionHeader text="Dodaj zawartość"/>

      <div className='add-content-body'>
        <form className='add-content-form'>
         
          <div className="form-group mt-3">
            <div className="radio-group">
              <div className="radio-option">
                <label htmlFor="special-offer" className="radio-label">Oferta specjalna</label>
                <input 
                  type="radio" 
                  id="special-offer" 
                  name="content-type" 
                  value="special-offer" 
                  checked={contentType === 'special-offer'} 
                  onChange={handleContentTypeChange} 
                  disabled={userData.accountType === 'Firma trzecia' || userData.accountType === 'Pracownik PŁ'} 
                />
              </div>
              <div className="radio-option">
                <label htmlFor="university-event" className="radio-label">Wydarzenie uczelniane</label>
                <input 
                  type="radio" 
                  id="university-event" 
                  name="content-type" 
                  value="university-event" 
                  checked={contentType === 'university-event'} 
                  onChange={handleContentTypeChange} 
                  disabled={userData.accountType === 'Firma trzecia' || userData.accountType === 'Pracownik PŁ'} 
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <input type="text" id="content-name" className="form-control input-centered" placeholder="Tytuł" required/>
          </div>

          <div className="form-group">
            <input type="text" id="content-address" className="form-control input-centered" placeholder="Adres" required/>
          </div>

          <div className="form-group">
            <input type="text" id="content-img" className="form-control input-centered" placeholder="Zdjęcie" required/>
          </div>

          <div className="form-group">
            <input 
              type="text" 
              id="content-promo-code" 
              className="form-control input-centered" 
              placeholder="Kod zniżkowy" 
              required 
              disabled={userData.accountType === 'Pracownik PŁ'} 
            />
          </div>

          <div className="form-group">
            <input type="text" id="content-description" className="form-control input-centered" placeholder="Opis" required/>
          </div>

          <Button text="DODAJ" />
        </form>
      </div>
      
      <Footer/>
    </main>
  );
}

export default AddContent;
