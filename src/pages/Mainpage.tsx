import React from 'react';
import Header from '../components/Header'
import Mainleftpage from '../components/MainLeft';
import Mainrightpage from '../components/MainRight';
import Map from '../components/Map'
import './CSS/Mainpage.css'

const Mainpage = () => {
    // state

    return (
        <div className='mainpage_container'>
            <Header />
            <div className="mainpage_body">
                <Mainleftpage />
                {/* <Mainrightpage /> */}
                {/* <div className="mainpage_rightside">
                    <div id="map">
                        <Map setCenter={setCenter} />
                    </div>
                </div> */}
            </div>
        </div>
    )
};

export default Mainpage;