import "./PlanCard.css";

function PlanCard({ planList }: any) {
  return (
    <div className="planCard">
      <div className="planCard__container">
        {planList?.map((el: any, idx: number) => {
          // const province = el?.spot?.map((el: any) => {
          //     return el?.map((el: any) => {
          //       return el.province;
          //     });
          //   });
          //   console.log(province);
          //   console.log(el);
          console.log(el);
          return (
            <div className="planCard__Card" key={idx}>
              <div className="planCard__contents">
                <div className="planCard__img">
                  <img src={el.spot[0][0].photo} alt="test" />
                </div>
                <div className="planCard__CardLocation">
                  <p>
                    여행경로: {el?.spot[0][0]?.province} ~{" "}
                    {el?.spot[el.spot.length - 1][0]?.province}
                  </p>
                </div>
                <div className="planCard__CardTheme">
                  <p>대표테마: {el.spot[1][0].theme[0]}</p>
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
