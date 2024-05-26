import React from 'react';
import './Home.css'; 
import Navigation from '../../components/navigation/Navigation';
import Footer from '../../components/footer/Footer';
import FreeHours from '../../components/freeHour/FreeHours';


function Home() {
  return (
    <main >

      <Navigation></Navigation>
     
      <div id="free-hours" className="pb-1">
          <div class="free-hours-header mb-3">
            <span>Najbliższe godziny wolne</span>
          </div>
          <div class="container">
          <div class="row m-5">
            <div class="col-lg-6">
              <div class="container">
                <div class="row">
                    <div class="hours-block-header col-sm-12">
                      <span>Rektorskie</span>
                    </div>
                    <FreeHours typeOfFreeHour={'RECTOR_HOUR'}/>
                </div>
              </div>
            
            </div>
            <div class="col-lg-6">
              <div class="container">
                <div class="row">
                    <div class="hours-block-header col-sm-12">
                      <span>Dziekańskie</span>
                    </div>
                    <FreeHours typeOfFreeHour={'DEAN_HOUR'}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <Footer/>

    </main>
  );
}

export default Home;
