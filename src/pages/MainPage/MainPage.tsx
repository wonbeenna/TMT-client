import { useEffect, useState } from "react";
import Modal from "../../modules/utils/Modal";
import "./MainPage.css";
import { Map, Header, MainList } from "../../components/index";
import { useDispatch } from "react-redux";
import { Actions } from "../../modules/api";

function MainPage() {
  const dispatch = useDispatch();
  const [lists, setLists] = useState<Array<string>>([]);
  useEffect(() => {
    dispatch(Actions.headerActions.headerStatus("/MainPage"));
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

export default MainPage;
