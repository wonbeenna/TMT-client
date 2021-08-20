import axios from "axios";
import { Actions } from "../..";
import requests from "../../../utils/requests";
import { accessToken } from "../../../../interfaces/";

export const withDrawReq =
  (AccessToken: accessToken) =>
  async (
    dispatch: (type: {
      type: string;
      payload: string | boolean | { accessToken: string; refreshToken: string };
    }) => void
  ) => {
    await axios
      .delete(requests.WithDrawURL, {
        headers: {
          authorization: `Bearer ${AccessToken.accessToken}`,
        },
      })
      .then((res) => {
        dispatch(Actions.userActions.AccessToken("", ""));
        dispatch(Actions.userActions.LoginStatus(false));
        window.location.href = "/Mainpage";
      })
      .catch((err) => {
        const status = err.response.data;
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(status.message));
      });
  };
