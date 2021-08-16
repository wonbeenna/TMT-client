import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrPage, ViewMap } from "../../components";
import { planGetReq, viewReq } from "../../modules/api/place";
import { RootReducer } from "../../modules/reducer";
import "./PlanView.css";

function PlanView() {
  const dispatch = useDispatch();
  const [planId, setPlanId] = useState<any>();
  const { viewList }: any = useSelector(
    (state: RootReducer) => state.viewListReducer
  );
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);

  useEffect(() => {
    setPlanId(window.location.pathname.split("/")[2]);
    dispatch(viewReq(planId));
  }, [dispatch, planId]);

  useEffect(() => {
    dispatch(planGetReq());
  }, [dispatch, viewList, planId]);

  return (
    <>
      {isLogin ? (
        <div className="planView">
          <div className="planView__container">
            <div className="view__Map">
              <ViewMap viewList={viewList?.viewData} />
            </div>
            {viewList?.viewData?.map((el: any, idx: number) => {
              return (
                <div key={idx}>
                  <div>
                    <h1>{el.name}님의 여행경로</h1>
                    {el?.spot?.map((e: any, idx: number) => {
                      console.log(e);
                      return <h1 key={idx}>{e.province}</h1>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <ErrPage />
      )}
    </>
  );
}

export default PlanView;
