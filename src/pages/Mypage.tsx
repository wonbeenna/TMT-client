import React, { useState } from "react";
import Map from '../components/Map'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './CSS/Mypage.css'

const Mypage = () => {

    return (
        <>
            <Header />
            <div className="mypage">
                <div className="mypageMap">
                    <Map />
                    <div className="route">여행 경로</div>
                </div>
                <div className="mypageMap">
                    <div className="calendar">
                    </div>
                    <div className="like">여행지like</div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Mypage;