import React, { useState } from 'react';
import './Registration.css'; 
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../../components/images/logo_transparent.png';
import Button from '../../components/button/Button';
import SectionHeader from '../../components/sectionHeader/SectionHeader';

const Registration = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAcceptTermsChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 6) {
      return;
    }
    if (!acceptTerms) {
      alert('Musisz wyrazić zgodę na przetwarzanie danych osobowych.');
      return;
    }
    navigate("/login");
  };

  return (
    <main>
      <nav className="navbar py-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" width="35" height="35"  className="d-inline-block align-text-top"/>
            <span className="ms-2">Stuuse</span>
          </Link>
        </div>
      </nav>

      <SectionHeader text="Rejestracja"/>

      <div className='registration-body'>
        <form className='registration-form' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Imię</label>
            <input type="text" id="name" className="form-control input-centered" value={name} onChange={handleNameChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Nazwisko</label>
            <input type="text" id="lastname" className="form-control input-centered" value={lastname} onChange={handleLastnameChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="login">Login</label>
            <input type="text" id="login" className="form-control input-centered" value={login} onChange={handleLoginChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control input-centered" value={email} onChange={handleEmailChange} required/>
          </div>

          <div className="form-group">
            <label htmlFor="firstPassword">Hasło</label>
            <input type="password" id="firstPassword" className="form-control input-centered" value={password} onChange={handlePasswordChange} required minLength={6}/>
          </div>

          <div className="form-group">
            <label htmlFor="accountType" className='mb-3 mt-3'>Typ konta</label>
            <select id="accountType" className="form-control" required>
              <option value="f3">Firma Trzecia</option>
              <option value="pł">Pracownik PŁ</option>
            </select>
          </div>

          <div className="form-group mt-4">
            <label className="form-check-label text-center" htmlFor="acceptTerms">
              Wyrażam zgodę na przetwarzanie moich danych osobowych
            </label>
            <input type="checkbox" id="acceptTerms" className="form-check-input" checked={acceptTerms} onChange={handleAcceptTermsChange} required/>
          </div>

          <Button type="submit" text="ZAREJESTRUJ" />
        </form>
      </div>
      
      <Footer/>
    </main>
  );
}

export default Registration;
