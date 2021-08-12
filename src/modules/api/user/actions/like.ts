import axios from "axios";
import { Actions } from "../..";
import { accessToken } from "../../../../interface";
import requests from "../../../utils/requests";

export const likeGetReq = (accessToken: accessToken) => (dispatch: any) => {
  axios
    .get(requests.likeURL, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      if (!accessToken) {
        return;
      } else {
        console.log(res.data.place);
        dispatch(Actions.userActions.userLike(res.data.place));
      }
    });
};

export const likeDeleteReq =
  (place: any, accessToken: accessToken) => (dispatch: any) => {
    axios
      .delete(requests.likeURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        data: {
          place: place,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

export const likePostReq =
  (place: any, accessToken: accessToken) => (dispatch: any) => {
    axios
      .post(
        requests.likeURL,
        {
          place: place,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => console.log(res));
  };
