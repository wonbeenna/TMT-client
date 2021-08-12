import axios from "axios";
import { Actions } from "../..";
import { userInfos, accessToken } from "../../../../interface";
import requests from "../../../utils/requests";

export const userInfoPostReq =
  ({ curPassword, password, accessToken }: userInfos) =>
  (dispatch: (arg0: { type: string; payload: string }) => void) => {
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
        console.log(res);
        dispatch(Actions.modalActions.modalName(""));
      });
  };

export const userInfoGetReq = (accessToken: accessToken) => (dispatch: any) => {
  axios
    .get(requests.userInfoURL, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => console.log(res));
};
