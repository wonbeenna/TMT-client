import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ErrPage, ViewMap } from "../../components";
import { Actions } from "../../modules/api";
import { RootState } from "../../modules/store";
import "./PlanView.css";

function PlanView({ location }: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogin } = useSelector((state: RootState) => state.LoginReducer);
  useEffect(() => {
    dispatch(Actions.headerActions.headerStatus("/PlanPage"));
  }, [dispatch]);

  const saveHandler = () => {
    history.push("/MainPage");
    dispatch(Actions.placeActions.placeList(location.state.spot));
  };
  return (
    <>
      {isLogin ? (
        <div className="planView">
          <div className="planView__container">
            <div className="planView__contents">
              <div className="planView__return">
                <img
                  src="../img/return.png"
                  alt="return"
                  onClick={() => history.push("/PlanPage")}
                />
              </div>
              <h1>{location?.state?.name}님의 여행경로</h1>
              {location?.state?.spot?.map((e: any, idx: number) => {
                return (
                  <div key={idx} className="planView__destination">
                    <div className="planView__destination__list">
                      <img src={e.photo} alt="" />
                    </div>
                    <div className="planView__list__container">
                      <div className="planView__list__content">
                        {e.place}
                        <img src="../img/flag.png" alt="flag" />
                      </div>
                      <div className="planView__list__address">{e.address}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="planView__Btn" onClick={saveHandler}>
              이경로로 여행하기
            </button>
          </div>
          <ViewMap viewList={location?.state?.spot} />
        </div>
      ) : (
        <ErrPage />
      )}
    </>
  );
}

export default PlanView;
