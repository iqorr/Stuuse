import React, { useState } from 'react';
import './Login.css'; 
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../../components/images/logo_transparent.png';
import Button from '../../components/button/Button';
import SectionHeader from '../../components/sectionHeader/SectionHeader';




const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    if (login.trim() !== '' && password.trim() !== '') {
      try {
        const response = await fetch('http://localhost:8080/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: login, password: password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.jwt);
          localStorage.setItem('userId', data.userId);
          navigate('/profile');
        } else {
          alert('Nieprawidłowy login lub hasło');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        alert('Błąd podczas łączenia z serwerem');
      }
    } else {
      alert('Proszę wypełnić oba pola');
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
        </div>
      </nav>

      <SectionHeader text="Logowanie"/>

      <div className='login-body'>
        <form className='login-form'>
          <div className="form-group">
          <label htmlFor="login">Login</label>
            <input type="text" id="login" className="form-control input-centered" value={login} onChange={handleLoginChange} required/>
          </div>

          <div className="form-group">
          <label htmlFor="password">Hasło</label>
            <input type="password" id="password" className="form-control input-centered" value={password} onChange={handlePasswordChange} required/>
          </div>
          <Button type={"button"} text="ZALOGUJ" onClick={handleLogin}/>
        </form>

        <div className='mt-3 new-account'>
          <span>Nie masz konta?</span><Link className='register-link' to="/registration"> utwórz je</Link>
        </div>
      </div>

      <Footer/>
    </main>
  );
}

export default Login;
