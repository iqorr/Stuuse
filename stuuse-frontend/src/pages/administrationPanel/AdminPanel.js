import React from 'react';
import './AdminPanel.css';
import Footer from '../../components/footer/Footer';
import UsersToAccept from "../../components/adminPanel/UsersToAccept";
import ContentToAccept from "../../components/adminPanel/ContentToAccept";
import FreeHoursToAccept from "../../components/adminPanel/FreeHoursToAccept";
import {Link} from "react-router-dom";
import logo from "../../components/images/logo_transparent.png";
import Logout from "../../components/logout/Logout";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
const AdminPanel = () =>{
    return (
        <>
            <nav className="navbar py-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="35" height="35" className="d-inline-block align-text-top"/>
                        <span className="ms-2">Stuuse</span>
                    </Link>
                    <Logout/>
                </div>
            </nav>

            <SectionHeader text="PANEL ADMINISTRATORA"/>

            <SectionHeader text="UŻYTKOWNICY"/>
            <section className="admin-section admin-panel-body">
                <UsersToAccept/>
            </section>

            <SectionHeader text="WYDARZENIA/OFERTY"/>
            <section className="admin-section admin-panel-body">
                <ContentToAccept/>
            </section>

            <SectionHeader text="REKTORSKIE"/>
            <section className="admin-section admin-panel-body">
                <FreeHoursToAccept typeOfFreeHour={"RECTOR_HOUR"}/>
            </section>

            <SectionHeader text="DZIEKAŃSKIE"/>
            <section className="admin-section admin-panel-body">
                <FreeHoursToAccept typeOfFreeHour={"DEAN_HOUR"}/>
            </section>

            <Footer/>
        </>

    );
}

export default AdminPanel;