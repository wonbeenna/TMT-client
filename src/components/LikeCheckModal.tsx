import React from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../actions";
import "./CSS/LikeCheckModal.css";

function LikeCheckModal() {
  const dispatch = useDispatch();

  const ModalHandler = (name: string) => {
    dispatch(Actions.modalStatus(true));
    dispatch(Actions.modalName(name));
  };
  const modalCloseHandler = () => {
    dispatch(Actions.modalStatus(false));
    dispatch(Actions.modalName(""));
  };

  return (
    <div className="likeCheckModal">
      <div className="likeCheckModal__modal">
        <div className="likeCheckModal__contents">
          <div className="likeCheckModal__close">
            <div
              className="likeCheckModal__closeBtn"
              onClick={modalCloseHandler}
            >
              &times;
            </div>
          </div>
          <div className="likeCheckModal__title">
            <img
              className="likeCheckModal__title__img"
              src="/img/Logo005.png"
              alt=""
            />
          </div>
          <div className="likeCheckModal__content">
            <img
              className="likeCheckModal__content__img"
              src="../img/padlock.png"
              alt=""
            />
            <div className="likeCheckModal__subTitle">
              <p className="likeCheckModal__subTitle a">로그인</p>
              <p className="likeCheckModal__subTitle b">
                이 필요한 서비스 입니다.
              </p>
            </div>
          </div>
          <div className="likeCheckModal__Btn">
            <button
              className="likeCheckModal__SignInBtn"
              onClick={() => {
                ModalHandler("SignIn");
              }}
            >
              로그인
            </button>
            <button
              className="likeCheckModal__SignUpBtn"
              onClick={() => {
                ModalHandler("SignUp");
              }}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikeCheckModal;
