import axios from "axios";
import { Actions } from "../..";
import { accessToken, userInfoPassword } from "../../../../interfaces";
import requests from "../../../utils/requests";

export const userInfoPostReq =
  ({ curPassword, password }: userInfoPassword, AccessToken: accessToken) =>
  async (dispatch: (type: { type: string; payload: string }) => void) => {
    await axios
      .post(
        requests.userInfoURL,
        {
          originalPw: curPassword,
          newPw: password,
        },
        {
          headers: {
            authorization: `Bearer ${AccessToken.accessToken}`,
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
  (AccessToken: accessToken) =>
  async (dispatch: (type: { type: string; payload: string }) => void) => {
    await axios
      .get(requests.userInfoURL, {
        headers: {
          authorization: `Bearer ${AccessToken.accessToken}`,
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
  (email: string) =>
  async (dispatch: (type: { type: string; payload: string }) => void) => {
    await axios
      .post(requests.checkEmailURL, {
        email: email,
      })
      .then((res) => {
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(res.data.message));
      })
      .catch((err) => {
        const status = err.response;
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status?.data.message));
      });
  };

export const checkPasswordReq =
  (email: string) =>
  async (dispatch: (type: { type: string; payload: string }) => void) => {
    await axios
      .post(requests.checkPasswordURL, {
        email: email,
      })
      .then((res) => {
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(res.data.message));
      })
      .catch((err) => {
        const status = err.response;
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status?.data.message));
      });
  };
