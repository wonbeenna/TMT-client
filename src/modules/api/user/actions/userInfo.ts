import axios from "axios";
import { Actions } from "../..";
import { accessToken, userInfoPassword } from "../../../../interfaces";
import requests from "../../../utils/requests";

export const userInfoPostReq =
  ({ curPassword, password }: userInfoPassword, accessToken: accessToken) =>
  (dispatch: (type: { type: string; payload: string }) => void) => {
    axios
      .post(
        requests.userInfoURL,
        {
          originalPw: curPassword,
          newPw: password,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(Actions.modalActions.modalName(""));
      })
      .catch((err) => {
        const status = err.response.data;
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status.message));
      });
  };

export const userInfoGetReq =
  (accessToken: accessToken) =>
  (dispatch: (type: { type: string; payload: string }) => void) => {
    axios
      .get(requests.userInfoURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage("다시 로그인 해주세요."));
      });
  };

export const checkEmailReq =
  (email: any) =>
  (dispatch: (type: { type: string; payload: string }) => void) => {
    axios
      .post(requests.checkEmailURL, {
        email: email,
      })
      .then((res) => {
        console.log(res);
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(res.data.message));
      })
      .catch((err) => {
        const status = err.response;
        console.log(status);
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status?.data.message));
      });
  };

export const checkPasswordReq =
  (email: any) =>
  (dispatch: (type: { type: string; payload: string }) => void) => {
    axios
      .post(requests.checkPasswordURL, {
        email: email,
      })
      .then((res) => {
        console.log(res);
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(res.data.message));
      })
      .catch((err) => {
        const status = err.response;
        console.log(status);
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status?.data.message));
      });
  };
