import "./CSS/MyTriproute.css";

const MyTriproute = ({ myplace }: any) => {
  return (
    <>
      <div className="route__body">
        {myplace?.spot?.map((el: any, idx: number) => {
          return el?.map((e: any) => {
            return (
              <>
                <div className="route__warp">
                  <div className="route__contents">
                    <img src={e.photo} alt="" />
                    <a target="_blank"></a>
                    <div className="route__content">
                      <div className="route__place">{e.place}</div>
                    </div>
                  </div>
                </div>
                <div className="route__arrow">
                  <img src="./img/arrow.png" alt="" />
                </div>
              </>
            );
          });
        })}
      </div>
    </>
  );
};
export default MyTriproute;
