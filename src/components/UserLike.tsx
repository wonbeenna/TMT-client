import { useEffect, useState } from "react";
import "./CSS/UserLike.css";

const UserLike = ({ likePlace }: any) => {
  return (
    <>
      <div className="userLike">
        {likePlace?.map((el: any) => {
          return (
            <div className="userLike__contents">
              <div className="userLike__img">
                <img src={el.photo} />
              </div>
              <div className="userLike__info">
                <p>{el.place}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default UserLike;
