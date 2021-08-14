import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Modal from "../modules/utils/Modal";
import "./CSS/Mainpage.css";
import { Map, Header, MainList } from "../components/index";
import { useDispatch } from "react-redux";
import { Actions } from "../modules/api";

function Mainpage() {
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
        <MainList lists={lists} setLists={setLists} />
        <Map lists={lists} setLists={setLists} />
      </div>
    </>
  );
}

export default withRouter(Mainpage);
