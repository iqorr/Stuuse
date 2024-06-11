import React from 'react';
import Navigation from '../../components/navigation/Navigation'
import './AdminPanel.css';
import Footer from '../../components/footer/Footer';
import UsersToAccept from "../../components/adminPanel/UsersToAccept";
import ContentToAccept from "../../components/adminPanel/ContentToAccept";
import FreeHoursToAccept from "../../components/adminPanel/FreeHoursToAccept";
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
                    <UsersToAccept />
                </section>
                <div className="admin-user">
                    <h2>WYDARZENIA/OFERTY</h2>
                </div>
                <section className="admin-section">
                    <ContentToAccept />
                </section>
                <div className="admin-user">
                    <h2>REKTORSKIE</h2>
                </div>
                <section className="admin-section">
                    <FreeHoursToAccept typeOfFreeHour={"RECTOR_HOUR"} />
                </section>
                <div className="admin-user">
                    <h2>DZIEKAŃSKIE</h2>
                </div>
                <section className="admin-section">
                    <FreeHoursToAccept typeOfFreeHour={"DEAN_HOUR"} />
                </section>
                <Footer />

            </div>
        </>

    );
}

export default AdminPanel;