import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header/Header";
import Mainleftpage from "../components/MainLeft";
import Modal from "../modules/utils/Modal";
import "./CSS/Mainpage.css";
import Map from "../components/Map";
import { useDispatch } from "react-redux";
import { Actions } from "../modules/api";

const Mainpage = () => {
  const dispatch = useDispatch();
  const [lists, setLists] = useState<Array<string>>([]);
  useEffect(() => {
    dispatch(Actions.headerActions.headerStatus("/Mainpage"));
  }, [dispatch]);
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
