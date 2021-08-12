import axios from "axios";
import { Actions } from "../..";
import requests from "../../../utils/requests";

export const userInfoPostReq =
  ({ curPassword, password, accessToken }: any) =>
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
        dispatch(Actions.modalActions.modalName(""));
      });
  };

export const userInfoGetReq = (accessToken: string) => () => {
  axios
    .get(requests.userInfoURL, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};
