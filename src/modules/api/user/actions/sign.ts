import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";
import { signIn, signUp } from "../../../../interfaces";
axios.defaults.withCredentials = true;

export const signInReq =
  ({ email, password }: signIn) =>
  async (
    dispatch: (type: {
      type:
        | string
        | { LOGIN_STATUS: string; USER_INFO: string; ACCESS_TOKEN: string };
      payload?:
        | string
        | boolean
        | { name: string; email: string }
        | { accessToken: string; refreshToken: string };
    }) => void
  ) => {
    await axios
      .post(requests.loginURL, {
        email,
        password,
      })
      .then((res) => {
        dispatch(Actions.userActions.LoginStatus(true));
        dispatch(Actions.modalActions.modalName(""));
        dispatch(Actions.userActions.userInfo(res.data.name, res.data.email));
        dispatch(
          Actions.userActions.AccessToken(
            res.data.accessToken,
            res.data.refreshToken
          )
        );
        window.location.href = "/Mainpage";
      })
      .catch((err) => {
        const status = err.response.data;
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status.message));
      });
  };

export const signUpReq =
  ({ name, email, password }: signUp) =>
  async (dispatch: (type: { type: string; payload: string }) => void) => {
    await axios
      .post(requests.signUpURL, {
        name,
        email,
        password,
      })
      .then((res) => {
        dispatch(Actions.modalActions.modalName("SignIn"));
      })
      .catch((err) => {
        const status = err.response.data;
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status.message));
      });
  };

export const nonUserReq =
  () =>
  async (
    dispatch: (type: {
      type: string;
      payload:
        | string
        | boolean
        | { name: string; email: string }
        | { accessToken: string; refreshToken: string };
    }) => void
  ) => {
    await axios
      .get(requests.nonUserLoginURL, {})
      .then((res) => {
        dispatch(Actions.userActions.userInfo(res.data.name, res.data.email));
        dispatch(
          Actions.userActions.AccessToken(
            res.data.accessToken,
            res.data.refreshToken
          )
        );
        dispatch(Actions.userActions.LoginStatus(true));
        dispatch(Actions.modalActions.modalName(""));
        window.location.href = "/Mainpage";
      })
      .catch((err) => {
        const status = err.response.data;
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status.message));
      });
  };

export const googleReq =
  (response: any) =>
  async (
    dispatch: (type: {
      type: string;
      payload:
        | string
        | boolean
        | { accessToken: string; refreshToken: string }
        | { name: string; email: string };
    }) => void
  ) => {
    await axios
      .post(requests.googleURL, {
        token: response.tokenObj.id_token,
      })
      .then((res) => {
        const status = res?.status;
        if (status === 200 || status === 201) {
          dispatch(
            Actions.userActions.AccessToken(
              res.data.accessToken,
              res.data.refreshToken
            )
          );
          dispatch(Actions.userActions.LoginStatus(true));
          dispatch(Actions.userActions.userInfo(res.data.name, res.data.email));
          dispatch(Actions.modalActions.modalName(""));
          window.location.href = "/Mainpage";
        }
      })
      .catch((err) => {
        const status = err.response.data;
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status.message));
      });
  };

export const kakaoReq =
  (response: any) =>
  async (
    dispatch: (type: {
      type: string;
      payload:
        | string
        | boolean
        | { accessToken: string; refreshToken: string }
        | { name: string; email: string };
    }) => void
  ) => {
    await axios
      .post(requests.kakaoURL, {
        kakaoToken: response.response.access_token,
      })
      .then((res) => {
        const status = res?.status;
        if (status === 200 || status === 201) {
          dispatch(
            Actions.userActions.AccessToken(
              res.data.accessToken,
              res.data.refreshToken
            )
          );
          dispatch(Actions.userActions.LoginStatus(true));
          dispatch(Actions.userActions.userInfo(res.data.name, res.data.email));
          dispatch(Actions.modalActions.modalName(""));
          window.location.href = "/Mainpage";
        }
      })
      .catch((err) => {
        const status = err.response.data;
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status.message));
      });
  };
