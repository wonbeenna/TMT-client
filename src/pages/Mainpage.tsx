import React from "react";
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
    </div>
  );
};

export default withRouter(Mainpage);
