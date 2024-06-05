import React, { useState } from 'react';
import './AddFreeHour.css';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import logo from '../../components/images/logo_transparent.png';
import Button from '../../components/button/Button';
import SectionHeader from '../../components/sectionHeader/SectionHeader';

const AddHour = () => {
    const [hourType, setHourType] = useState('');

    const handleHourTypeChange = (event) => {
        setHourType(event.target.value);
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

            <SectionHeader text="Dodaj wolne godziny"/>

            <div className='add-hour-body'>
                <form className='add-hour-form'>
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
                        <label htmlFor="hour-date">Data</label>
                        <input type="text" id="hour-date" className="form-control input-centered" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="hour-time">Czas trwania</label>
                        <input type="text" id="hour-time" className="form-control input-centered" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="hour-faculty">Wydział</label>
                        <input type="text" id="hour-faculty" className="form-control input-centered" required/>
                    </div>

                    <Button text="DODAJ" />
                </form>
            </div>

            <Footer/>
        </main>
    );
}

export default AddHour;
