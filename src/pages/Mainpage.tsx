import React from 'react';
import Mainrightpage from '../components/MainRight';
import Mainleftpage from '../components/MainLeft';
import Header from '../components/Header'
import './CSS/Mainpage.css'

const Mainpage = () => {
    // state
    return (
        <div className='mainpage_container'>
            <Header />
            <div className="mainpage_body">
                <Mainleftpage />
                <Mainrightpage />
            </div>
        </div>
    )
};

export default Mainpage;