import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../api";
import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";
import UserInfo from "../../pages/UserInfo";
import LikeCheckModal from "../../components/LikeCheck/LikeCheckModal";
import { RootReducer } from "../reducer";
import UserInfoCheck from "../../components/UserInfoCheck/UserInfoCheck";
import WithDraw from "../../components/WithDraw/WithDraw";
import ErrModal from "../../components/ErrModal/ErrModal";

function Modal() {
  const dispatch = useDispatch();

  const { modalName } = useSelector(
    (state: RootReducer) => state.modalNameReducer
  );
  const { modalStatus } = useSelector(
    (state: RootReducer) => state.modalStatusReducer
  );

  useEffect(() => {}, [modalName, modalStatus]);

  const ModalHandler = (status: boolean, name: string) => {
    dispatch(Actions.modalActions.modalStatus(status));
    dispatch(Actions.modalActions.modalName(name));
  };

  const ModalName = [
    <SignIn {...ModalHandler} />,
    <SignUp {...ModalHandler} />,
    <UserInfo {...ModalHandler} />,
    <LikeCheckModal {...ModalHandler} />,
    <UserInfoCheck {...ModalHandler} />,
    <WithDraw {...ModalHandler} />,
    <ErrModal {...ModalHandler} />,
  ];
  const ModalNamesIndex = [
    "SignIn",
    "SignUp",
    "UserInfo",
    "LikeCheckModal",
    "UserInfoCheck",
    "WithDraw",
    "ErrModal",
  ];

  return <div>{ModalName[ModalNamesIndex.indexOf(modalName)]}</div>;
}

export default Modal;
