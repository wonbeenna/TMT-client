import { ACTIONS_USER } from "../../../actionsType";
import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";
axios.defaults.withCredentials = true;

export const signInReq =
  ({ email, password }: any) =>
  (
    dispatch: (arg0: {
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
    dispatch({ type: ACTIONS_USER });
    axios
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
      });
  };

export const signUpReq =
  ({ name, email, password }: any) =>
  (dispatch: (arg0: { type: string; payload: string }) => void) => {
    axios
      .post(requests.signUpURL, {
        name,
        email,
        password,
      })
      .then((res) => {
        dispatch(Actions.modalActions.modalName("SignIn"));
      });
  };

export const nonUserReq =
  () =>
  (
    dispatch: (arg0: {
      type: string;
      payload: string | boolean | { accessToken: string; refreshToken: string };
    }) => void
  ) => {
    axios.get(requests.nonUserLoginURL, {}).then((res) => {
      dispatch(
        Actions.userActions.AccessToken(
          res.data.accessToken,
          res.data.refreshToken
        )
      );
      dispatch(Actions.userActions.LoginStatus(true));
      dispatch(Actions.modalActions.modalName(""));
      window.location.href = "/Mainpage";
    });
  };

export const googleReq =
  (response: any) =>
  (
    dispatch: (arg0: {
      type: string;
      payload:
        | string
        | boolean
        | { accessToken: string; refreshToken: string }
        | { name: string; email: string };
    }) => void
  ) => {
    axios
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
      .catch((err) => console.log(err));
  };

export const kakaoReq =
  (response: any) =>
  (
    dispatch: (arg0: {
      type: string;
      payload:
        | string
        | boolean
        | { accessToken: string; refreshToken: string }
        | { name: string; email: string };
    }) => void
  ) => {
    axios
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
      });
  };
