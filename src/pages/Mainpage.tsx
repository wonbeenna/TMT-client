import React from 'react';
import Mainrightpage from '../components/MainRight';
import Mainleftpage from '../components/MainLeft';
import Footer from '../components/Footer';
import './CSS/Mainpage.css'

const Mainpage = () => {

    return (

        <div className='mainpage_container'>
            <Mainleftpage />
            <Mainrightpage message="i" />
            <Footer />
        </div>
    )
};

export default Mainpage;