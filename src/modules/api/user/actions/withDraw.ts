import axios from "axios";
import { Actions } from "../..";
import { userInfos, accessToken } from "../../../../interface";
import requests from "../../../utils/requests";

export const withDrawReq = (accessToken: accessToken) => (dispatch: any) => {
  axios
    .delete(requests.WithDrawURL, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      dispatch(Actions.userActions.AccessToken("", ""));
      dispatch(Actions.userActions.LoginStatus(false));
      //   window.location.href = "/Mainpage";
    });
};
