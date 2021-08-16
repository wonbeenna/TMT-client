import { Link } from "react-router-dom";
import "./PlanCard.css";

function PlanCard({ planList }: any) {
  const deleteHandler = () => {
    console.log("삭제");
  };

  return (
    <div className="planCard">
      <div className="planCard__container">
        {planList?.map((el: any, idx: number) => {
          return (
            <div className="planCard__Card" key={idx}>
              <div className="planCard__contents">
                <Link
                  to={`/PlanView/${el._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="planCard__img">
                    <img src={el?.spot[0]?.photo} alt="test" />
                  </div>
                  <div className="planCard__Name">
                    <p>{el.name} 님의 여행경로</p>
                  </div>
                  <div className="planCard__CardLocation">
                    <p>
                      여행경로: {el?.spot[0]?.province} ~{" "}
                      {el?.spot[el?.spot?.length - 1]?.province}
                    </p>
                  </div>
                </Link>
                <div className="planCard__CardTheme">
                  <p>대표테마: {el?.spot[0]?.theme[0]}</p>
                  <div onClick={deleteHandler}>
                    <img src="./img/delete.png" alt="delete" />
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
