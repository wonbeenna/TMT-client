import { useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import Mainleftpage from "../components/MainLeft";
import Modal from "../components/Modal";
import "./CSS/Mainpage.css";
import Map from "../components/Map";

const Mainpage = () => {
  const [lists, setLists] = useState<Array<string>>([]);
  return (
    <>
      <Modal />
      <div className="mainpage_container">
        <Header />
        <Mainleftpage lists={lists} setLists={setLists} />
        <Map className="Map" lists={lists} setLists={setLists} />
      </div>
    </>
  );
};

export default withRouter(Mainpage);
