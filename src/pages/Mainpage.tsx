import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import Mainleftpage from "../components/MainLeft";
import Modal from "../components/Modal";
import "./CSS/Mainpage.css";

const Mainpage = () => {
  // state

  return (
    <div className="mainpage_container">
      <Modal />
      <Header />
      <Mainleftpage />
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
