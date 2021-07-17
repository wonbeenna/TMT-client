import React from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../actions";
import "./CSS/UserInfoCheck.css";

function UserInfoCheck() {
  const dispatch = useDispatch();

  const modalCloseHandler = () => {
    dispatch(Actions.modalStatus(false));
    dispatch(Actions.modalName(""));
  };

  return (
    <div>
      <div className="UserInfoCheck">
        <div className="UserInfoCheck__modal">
          <div className="UserInfoCheck__contents">
            <div className="UserInfoCheck__title">
              <img
                className="UserInfoCheck__title__img"
                src="/img/Logo005.png"
                alt=""
              />
            </div>
            <div className="UserInfoCheck__content">변경 완료!</div>
            <div
              className="UserInfoCheck__closeBtn"
              onClick={modalCloseHandler}
            >
              확인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCheck;
