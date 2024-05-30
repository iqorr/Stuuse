import React from 'react';
import './Home.css'; 
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import FreeHours from '../../components/freeHour/FreeHours';
import Events from "../../components/events/Events";
import Offers from "../../components/offers/Offers";
import Logout from "../../components/logout/Logout";


function Home() {
  return (
      <main>

          <Navigation></Navigation>

          <div id="free-hours" className="pb-1">
              <div className="section-header mb-3">
                  <span>Najbliższe godziny wolne</span>
              </div>
              <div className="container">
                  <div className="row m-5">
                      <div className="col-lg-6">
                          <div className="container">
                              <div className="row">
                                  <div className="hours-block-header col-sm-12">
                                      <span>Rektorskie</span>
                                  </div>
                                  <FreeHours typeOfFreeHour={'RECTOR_HOUR'}/>
                              </div>
                          </div>

                      </div>
                      <div className="col-lg-6">
                          <div className="container">
                              <div className="row">
                                  <div className="hours-block-header col-sm-12">
                                      <span>Dziekańskie</span>
                                  </div>
                                  <FreeHours typeOfFreeHour={'DEAN_HOUR'}/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div id="events" className="pb-1">
            <div className="section-header">
                <span>Wydarzenia uczelniane</span>
            </div>
            <Events typeOfContent={'EVENT'}/>
          </div>

          <div id="offers" className="pb-1">
            <div className="section-header">
                <span>Oferty specjalne</span>
            </div>

            <Offers typeOfContent={'OFFER'}/>

          </div>

          <Footer/>

      </main>
  );
}

export default Home;
