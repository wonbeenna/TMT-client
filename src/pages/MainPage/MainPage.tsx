import { useEffect, useState } from "react";
import Modal from "../../modules/utils/Modal";
import "./MainPage.css";
import { Map, Header, MainList } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../modules/api";
import { RootState } from "../../modules/store";

function MainPage() {
  const dispatch = useDispatch();
  const [lists, setLists] = useState<Array<string>>([]);
  useEffect(() => {
    dispatch(Actions.headerActions.headerStatus("/MainPage"));
  }, [dispatch]);
  const { listData } = useSelector(
    (state: RootState) => state.placeListReducer
  );
  useEffect(() => {
    setLists(listData);
  }, []);
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
