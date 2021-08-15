import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../modules/api";
import { checkPasswordReq } from "../../modules/api/user";
import "./PasswordCheck.css";
function PasswordCheck() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const onChangHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    setEmail(event.target.value);
  };

  const checkEmail = () => {
    dispatch(checkPasswordReq(email));
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
      <div className="passwordCheck">
        <div className="passwordCheck__modal">
          <div className="passwordCheck__contents">
            <div
              className="passwordCheck__contents__close"
              onClick={modalCloseHandler}
            >
              &times;
            </div>
            <div className="passwordCheck__title">
              <img
                className="passwordCheck__title__img"
                src="/img/Logo005.png"
                alt=""
              />
            </div>
            <div className="passwordCheck__content">
              가입하신 이메일로 임시 비밀번호를 전송해 드립니다. <br></br>
              가입하신 이메일을 입력해주세요.
            </div>
            <input
              className="passwordCheck__input"
              name="passwordCheck"
              type="passwordCheck"
              onChange={(e) => {
                onChangHandler(e, "passwordCheck");
              }}
            />
            <div
              className="passwordCheck__backBtn"
              onClick={() => {
                ModalHandler("SignIn");
              }}
            >
              돌아가기
            </div>
            <div className="passwordCheck__closeBtn" onClick={checkEmail}>
              전송하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordCheck;
