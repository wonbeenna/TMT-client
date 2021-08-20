import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Header, PlanCard, PlanSearch } from "../../components/index";
import { Actions } from "../../modules/api";
import { planGetReq } from "../../modules/api/place";
import { RootState } from "../../modules/store";
import Modal from "../../modules/utils/Modal";
import "./PlanPage.css";

function PlanPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.headerActions.headerStatus("/PlanPage"));
  }, [dispatch]);
  const { planList } = useSelector((state: RootState) => state.planListReducer);
  useEffect(() => {
    dispatch(planGetReq());
  }, [dispatch]);

  return (
    <>
      <Modal />
      <div className="planPage">
        <Header />
        <div className="planPage__container">
          <div className="planPage__banner">
            <div className="planPage__title">
              <p>
                나만 알고있기 아깝지 않으세요?<br></br> 다른사람들과 여행경로를
                공유해 보세요!!
              </p>
            </div>
            <img src="./img/tour.png" alt="tour" />
            <button
              className="planPage__MainBtn"
              onClick={() => history.push("/MainPage")}
            >
              나만의 경로 만들기
            </button>
          </div>
          <PlanSearch planList={planList} />
          <PlanCard planList={planList} />
        </div>
      </div>
    </>
  );
}

export default PlanPage;
