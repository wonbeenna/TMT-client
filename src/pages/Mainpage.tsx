import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import Mainleftpage from "../components/MainLeft";
import Modal from "../components/Modal";
import "./CSS/Mainpage.css";
import Map from "../components/Map";

const Mainpage = () => {
  return (
    <div className="mainpage_container">
      <Modal />
      <Header />
      <Mainleftpage />
      <Map className="Map" />
      {/* <Mainrightpage /> */}
      {/* <div className="mainpage_rightside">
                    <div id="map">
                        <Map setCenter={setCenter} />
                    </div>
                </div> */}
    </div>
  );
};

export default withRouter(Mainpage);
