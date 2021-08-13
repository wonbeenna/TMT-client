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
      .catch((err) => console.log(err));
  };

export const userInfoGetReq = (accessToken: accessToken) => () => {
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
