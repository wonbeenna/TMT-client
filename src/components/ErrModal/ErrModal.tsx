import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../modules/api";
import { RootState } from "../../modules/store";
import "./ErrModal.css";

function ErrModal() {
  const dispatch = useDispatch();

  const modalCloseHandler = () => {
    dispatch(Actions.modalActions.modalStatus(false));
    dispatch(Actions.modalActions.modalName(""));
    dispatch(Actions.modalActions.modalMessage(""));
    window.history.go(0);
  };
  const { modalMessage } = useSelector(
    (state: RootState) => state.modalMessageReducer
  );

  return (
    <div className="errModal">
      <div className="errModal__container">
        <div className="errModal__contents">
          <div className="errModal__close__Btn" onClick={modalCloseHandler}>
            &times;
          </div>
          <img src="../img/siren.png" alt="siren" />
          <div className="errModal__title">
            <p>{modalMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrModal;
