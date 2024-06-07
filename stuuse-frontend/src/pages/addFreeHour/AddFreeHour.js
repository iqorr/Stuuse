import React, { useState, useEffect } from 'react';
import './AddFreeHour.css';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import logo from '../../components/images/logo_transparent.png';
import Button from '../../components/button/Button';
import SectionHeader from '../../components/sectionHeader/SectionHeader';
import Logout from '../../components/logout/Logout';


const AddHour = () => {
    const [hourType, setHourType] = useState('');
    const [formData, setFormData] = useState({
        date: '',
        duration: '',
        faculty: ''
    });
    const [userData, setUserData] = useState({
        name: '',
        lastname: '',
        login: '',
        email: '',
        accountType: '',
        verified: false
    });
    const [errors, setErrors] = useState({
        duration: ''
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

    useEffect(() => {
        if (userData.accountType === 'Firma trzecia') {
            setHourType('rector-hour');
        } else if (userData.accountType === 'Pracownik PŁ') {
            setHourType('dean-hour');
        }
    }, [userData.accountType]);

    const handleHourTypeChange = (event) => {
        setHourType(event.target.value);
        if (event.target.value === 'rector-hour') {
            setFormData((prevState) => ({
                ...prevState,
                faculty: ''
            }));
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const validateDuration = (duration) => {
        const durationRegex = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/;
        return durationRegex.test(duration);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateDuration(formData.duration)) {
            setErrors((prevState) => ({
                ...prevState,
                duration: 'Czas trwania musi być w formacie HH:mm-HH:mm'
            }));
            return;
        }

        setErrors((prevState) => ({
            ...prevState,
            duration: ''
        }));

        const freeHourData = {
            typeOfFreeHour: hourType === 'rector-hour' ? 'RECTOR_HOUR' : 'DEAN_HOUR',
            date: formData.date,
            duration: formData.duration,
            faculty: hourType === 'rector-hour' ? '' : formData.faculty
        };

        try {
            const response = await fetch('http://localhost:8080/api/free_hours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(freeHourData)
            });
            if (!response.ok) {
                const errorDetail = await response.text();
                throw new Error(`Network response was not ok: ${response.statusText} - ${errorDetail}`);
            }
            const result = await response.json();
            console.log('Free hour added successfully:', result);

            setFormData({
                date: '',
                duration: '',
                faculty: ''
            });

            alert('Pomyślnie dodano zawartość');
        } catch (error) {
            console.error('Error adding free hour:', error);
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
                    <Logout/>
                </div>
            </nav>

            <SectionHeader text="Dodaj wolne godziny"/>

            <div className='add-hour-body'>
                <form className='add-hour-form' onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                        <div className="radio-group">
                            <div className="radio-option">
                                <label htmlFor="rector-hour" className="radio-label">Godzina rektorska</label>
                                <input type="radio" id="rector-hour" name="hour-type" value="rector-hour" checked={hourType === 'rector-hour'} onChange={handleHourTypeChange} />
                            </div>
                            <div className="radio-option">
                                <label htmlFor="dean-hour" className="radio-label">Godzina dziekańska</label>
                                <input type="radio" id="dean-hour" name="hour-type" value="dean-hour" checked={hourType === 'dean-hour'} onChange={handleHourTypeChange} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Data</label>
                        <input type="date" id="date" className="form-control input-centered" required value={formData.date} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Czas trwania</label>
                        <input placeholder="HH:mm-HH:MM"type="text" id="duration" className="form-control input-centered" required value={formData.duration} onChange={handleInputChange} />
                        {errors.duration && <small className="text-danger">{errors.duration}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="faculty">Wydział</label>
                        <input type="text" id="faculty" className="form-control input-centered" required={!hourType || hourType === 'dean-hour'} disabled={hourType === 'rector-hour'} value={formData.faculty} onChange={handleInputChange} />
                    </div>

                    <Button type="submit" text="DODAJ"/>
                </form>
            </div>

            <Footer/>
        </main>
    );
}

export default AddHour;
