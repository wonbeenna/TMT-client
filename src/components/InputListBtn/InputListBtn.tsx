import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../modules/api";
import { insertSpotReq } from "../../modules/api/place";
import "./InputListBtn.css";
import { InputListBtnProps } from "../../interfaces";
import { RootState } from "../../modules/store";

function InputListBtn({ startToday, endToday, lists }: InputListBtnProps) {
  const dispatch = useDispatch();
  const { AccessToken } = useSelector(
    (state: RootState) => state.accessTokenReducer
  );
  const { isLogin } = useSelector((state: RootState) => state.LoginReducer);

  const sendHandler = async () => {
    if (isLogin) {
      dispatch(insertSpotReq({ lists, startToday, endToday }, AccessToken));
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
