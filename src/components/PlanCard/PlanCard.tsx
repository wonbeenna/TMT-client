import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { planDeleteReq } from "../../modules/api/place";
import { RootState } from "../../modules/store";
import "./PlanCard.css";

function PlanCard({ planList }: any) {
  const dispatch = useDispatch();

  const { userInfo }: any = useSelector(
    (state: RootState) => state.userInfoReducer
  );
  const accessToken: any = useSelector(
    (state: RootState) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;
  const deleteHandler = (_id: any) => {
    dispatch(planDeleteReq(_id, setAccessToken));
  };
  return (
    <div className="planCard">
      <div className="planCard__container">
        {planList?.map((el: any, idx: number) => {
          return (
            <div className="planCard__Card" key={idx}>
              <div className="planCard__contents">
                <Link
                  to={{
                    pathname: `/PlanView/${el._id}`,
                    state: {
                      id: el._id,
                      name: el.name,
                      spot: el.spot,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <div className="planCard__img">
                    <img src={el?.spot && el?.spot[0]?.photo} alt="test" />
                  </div>
                  <div className="planCard__Name">
                    <p>{el.name} 님의 여행경로</p>
                  </div>
                  <div className="planCard__CardLocation">
                    <p>
                      여행경로: {el?.spot && el?.spot[0]?.province} ~{" "}
                      {el?.spot && el?.spot[el?.spot?.length - 1]?.province}
                    </p>
                  </div>
                </Link>
                <div className="planCard__CardTheme">
                  <p>대표테마: {el?.spot && el?.spot[0]?.theme[0]}</p>
                  <div onClick={() => deleteHandler(el?._id)}>
                    {el.email === userInfo.email ? (
                      <img src="../img/delete.png" alt="" />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanCard;
