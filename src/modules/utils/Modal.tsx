import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../api";
import {
  LikeCheckModal,
  UserInfoCheck,
  WithDraw,
  ErrModal,
  EmailCheck,
  PasswordCheck,
} from "../../components/index";
import { SignIn, SignUp, UserInfo } from "../../pages/index";

import { RootReducer } from "../reducer";

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
    <EmailCheck {...ModalHandler} />,
    <PasswordCheck {...ModalHandler} />,
  ];
  const ModalNamesIndex = [
    "SignIn",
    "SignUp",
    "UserInfo",
    "LikeCheckModal",
    "UserInfoCheck",
    "WithDraw",
    "ErrModal",
    "EmailCheck",
    "PasswordCheck",
  ];

  return <div>{ModalName[ModalNamesIndex.indexOf(modalName)]}</div>;
}

export default Modal;
