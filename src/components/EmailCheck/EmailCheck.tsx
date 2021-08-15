import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../modules/api";
import { checkEmailReq } from "../../modules/api/user";
import "./EmailCheck.css";
function EmailCheck() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const onChangHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    setEmail(event.target.value);
  };

  const checkEmail = () => {
    dispatch(checkEmailReq(email));
  };
  const ModalHandler = (name: string) => {
    dispatch(Actions.modalActions.modalStatus(true));
    dispatch(Actions.modalActions.modalName(name));
  };
  const modalCloseHandler = () => {
    dispatch(Actions.modalActions.modalStatus(false));
    dispatch(Actions.modalActions.modalName(""));
    dispatch(Actions.modalActions.modalMessage(""));
  };

  return (
    <div>
      <div className="emailCheck">
        <div className="emailCheck__modal">
          <div className="emailCheck__contents">
            <div
              className="emailCheck__contents__close"
              onClick={modalCloseHandler}
            >
              &times;
            </div>
            <div className="emailCheck__title">
              <img
                className="emailCheck__title__img"
                src="/img/Logo005.png"
                alt=""
              />
            </div>
            <div className="emailCheck__content">
              가입하신 이메일을 입력해주세요.
            </div>
            <input
              className="emailCheck__input"
              name="emailCheck"
              type="emailCheck"
              onChange={(e) => {
                onChangHandler(e, "emailCheck");
              }}
            />
            <div
              className="emailCheck__backBtn"
              onClick={() => {
                ModalHandler("SignIn");
              }}
            >
              돌아가기
            </div>
            <div className="emailCheck__closeBtn" onClick={checkEmail}>
              확인하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailCheck;
