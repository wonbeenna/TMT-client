import "./MyTriproute.css";

const MyTriproute = ({ myplace }: any) => {
  return (
    <>
      <div className="route__body">
        {myplace?.spot?.map((el: any, idx: number) => {
          return (
            <>
              <div className="route__warp">
                <div className="route__contents">
                  <img src={el.photo} alt="" key={idx} />
                  <div className="route__content">
                    <div className="route__place">{el.place}</div>
                  </div>
                </div>
              </div>
              <div className="route__arrow">
                <img src="./img/arrow.png" alt="" />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default MyTriproute;
