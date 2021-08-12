import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../modules/api";
import { RootReducer } from "../modules/reducer";
import "./CSS/WithDraw.css";
import { withDrawReq } from "../modules/api/user";

axios.defaults.withCredentials = true;

function WithDraw() {
  const dispatch = useDispatch();
  const ModalHandler = (name: string) => {
    dispatch(Actions.modalActions.modalStatus(true));
    dispatch(Actions.modalActions.modalName(name));
  };
  const modalCloseHandler = () => {
    dispatch(Actions.modalActions.modalStatus(false));
    dispatch(Actions.modalActions.modalName(""));
  };

  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;

  const WithDrawHandler = async () => {
    dispatch(withDrawReq(setAccessToken));
    modalCloseHandler();
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
