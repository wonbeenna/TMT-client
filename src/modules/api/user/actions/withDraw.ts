import axios from "axios";
import { Actions } from "../..";
import requests from "../../../utils/requests";

export const withDrawReq =
  (accessToken: string) =>
  (
    dispatch: (arg0: {
      type: string;
      payload: boolean | { accessToken: string; refreshToken: string };
    }) => void
  ) => {
    axios
      .delete(requests.WithDrawURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        dispatch(Actions.userActions.AccessToken("", ""));
        dispatch(Actions.userActions.LoginStatus(false));
        window.location.href = "/Mainpage";
      });
  };
