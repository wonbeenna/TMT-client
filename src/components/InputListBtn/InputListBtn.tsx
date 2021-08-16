import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../modules/reducer";
import { Actions } from "../../modules/api";
import { insertSpotReq } from "../../modules/api/place";
import "./InputListBtn.css";
import { InputListBtnProps } from "../../interfaces";

function InputListBtn({ startToday, endToday, lists }: InputListBtnProps) {
  const dispatch = useDispatch();
  const accessToken: any = useSelector(
    (state: RootReducer) => state.accessTokenReducer
  );
  const setAccessToken = accessToken.AccessToken.accessToken;
  const { isLogin } = useSelector((state: RootReducer) => state.LoginReducer);

  const sendHandler = async () => {
    if (isLogin) {
      dispatch(insertSpotReq({ lists, startToday, endToday }, setAccessToken));
    } else {
      const ModalHandler = (name: string) => {
        dispatch(Actions.modalActions.modalStatus(true));
        dispatch(Actions.modalActions.modalName(name));
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
