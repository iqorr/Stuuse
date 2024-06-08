import React from 'react';
import Navigation from '../../components/navigation/Navigation'
import './Admin_panel.css';
import Footer from '../../components/footer/Footer';
const AdminPanel = () =>{
    return (
        <>
            <Navigation></Navigation>
            <div className="admin-panel">
                <header className="admin-header">PANEL ADMINISTRATORA</header>
                <div className="admin-user">
                    <h2>UŻYTKOWNICY</h2>
                </div>
                <section className="admin-section">

                    <div className="card">
                        <div className="user-info">
                            Jan Kowalski "Pracownik PL" jankowalski@o2.pl
                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="user-info">

                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="user-info">

                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                </section>
                <div className="admin-user">
                    <h2>WYDARZENIA/OFERTY</h2>
                </div>
                <section className="admin-section">

                    <div className="card">
                        <div className="event-info">
                            Jan Kowalski "Juwenalia"
                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="event-info">
                            Jan Kowalski "KFC"
                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="event-info">

                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                </section>
                <div className="admin-user">
                    <h2>REKTORSKIE</h2>
                </div>
                <section className="admin-section">

                    <div className="card-1">
                        <div className="hour-info2">
                            10 kwietnia<br/>12:00 - 14:00
                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                    <div className="card-2">
                        <div className="hour-info2">
                            10 kwietnia<br/>12:00 - 14:00
                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                    <div className="card-3">
                        <div className="hour-info2">
                            10 kwietnia<br/>12:00 - 14:00
                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                </section>
                <div className="admin-user">
                    <h2>DZIEKAŃSKIE</h2>
                </div>
                <section className="admin-section">

                    <div className="card-1">
                        <div className="hour-info2">
                            FITMS<br/>10 kwietnia<br/>
                            12:00 - 14:00
                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                    <div className="card-2">
                        <div className="hour-info2">
                            FITMS<br/>10 kwietnia<br/>
                            12:00 - 14:00
                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                    <div className="card-3">
                        <div className="hour-info2">
                            FITMS<br/>10 kwietnia<br/>
                            12:00 - 14:00
                        </div>
                        <div className="actions">
                            <button className="approve">✓</button>
                            <button className="reject">✗</button>
                        </div>
                    </div>
                </section>
                <Footer>

                </Footer>
            </div>
        </>

    );
}

export default AdminPanel;


// Path: Stuuse/stuuse-frontend/src/pages/administration-panel/Admin_panel.css