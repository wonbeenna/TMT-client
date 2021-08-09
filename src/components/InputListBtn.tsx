import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../redux/reducers";
import { Actions } from "../redux/actions";
import axios from "axios";
axios.defaults.withCredentials = true;
function InputListBtn({ startToday, endToday, lists }: any) {
  const dispatch = useDispatch();
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);

  const sendHandler = async () => {
    if (isLogin) {
      const sendURL = `${process.env.REACT_APP_API}/trip/insertSpot`;
      await axios
        .post(
          sendURL,
          {
            place: lists,
            startDate: startToday,
            endDate: endToday,
          },
          {
            headers: {
              authorization: `Bearer ${setAccessToken}`,
            },
          }
        )
        .then((res) => {
          window.location.href = "/Mypage";
        });
    } else {
      const ModalHandler = (name: string) => {
        dispatch(Actions.modalStatus(true));
        dispatch(Actions.modalName(name));
      };
      ModalHandler("LikeCheckModal");
    }
  };

  return (
    <div className="inputList__save">
      <button className="inputList__saveBtn" onClick={sendHandler}>
        저장하기
      </button>
    </div>
  );
}

export default InputListBtn;
