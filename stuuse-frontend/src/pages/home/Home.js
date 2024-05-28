import React from 'react';
import './Home.css'; 
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import FreeHours from '../../components/freeHour/FreeHours';
import Events from "../../components/events/Events";


function Home() {
  return (
      <main>

          <Navigation></Navigation>

          <div id="free-hours" className="pb-1">
              <div className="free-hours-header mb-3">
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

          <div className="events-header">
              <span>Wydarzenia uczelniane</span>
          </div>
          <Events typeOfContent={'EVENT'}/>


          <Footer/>

      </main>
  );
}

export default Home;
