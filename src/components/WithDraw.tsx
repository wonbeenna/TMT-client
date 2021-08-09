import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../redux/actions";
import { RootReducer } from "../redux/reducers";
import "./CSS/WithDraw.css";
import requests from "../modules/requests";
axios.defaults.withCredentials = true;

function WithDraw() {
  const dispatch = useDispatch();
  const ModalHandler = (name: string) => {
    dispatch(Actions.modalStatus(true));
    dispatch(Actions.modalName(name));
  };
  const modalCloseHandler = () => {
    dispatch(Actions.modalStatus(false));
    dispatch(Actions.modalName(""));
  };

  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;

  const WithDrawHandler = async () => {
    await axios
      .delete(requests.WithDrawURL, {
        headers: {
          authorization: `Bearer ${setAccessToken}`,
        },
      })
      .then((res) => {
        dispatch(Actions.AccessToken("", ""));
        dispatch(Actions.LoginStatus(false));
        modalCloseHandler();
        window.location.href = "/Mainpage";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="WithDraw">
        <div className="WithDraw__modal">
          <div className="WithDraw__contents">
            <div className="WithDraw__title">
              <img
                className="WithDraw__title__img"
                src="/img/Logo005.png"
                alt=""
              />
            </div>

            <div className="WithDraw__content">정말 탈퇴 하시겠습니까...?</div>
            <div className="WithDraw__Btn">
              <button className="WithDraw__sendBtn" onClick={WithDrawHandler}>
                확인
              </button>
              <button
                className="WithDraw__closeBtn"
                onClick={() => ModalHandler("UserInfo")}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithDraw;
