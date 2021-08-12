import axios from "axios";
import { Actions } from "../..";
import requests from "../../../utils/requests";

export const likeGetReq =
  (accessToken: string) =>
  (dispatch: (arg0: { type: string; payload: string[] }) => void) => {
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
          dispatch(Actions.userActions.userLike(res.data.place));
        }
      });
  };

export const likeDeleteReq =
  (place: Array<string>, accessToken: string) => () => {
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
        return res.data;
      });
  };

export const likePostReq =
  (place: Array<string>, accessToken: string) => () => {
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
      .then((res) => {
        return res.data;
      });
  };

export const likePhotoReq =
  (setResult: any, setLikePlace: any, setIsLoading: any, accessToken: string) =>
  () => {
    axios
      .get(requests.photoLikeURL, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data === undefined || res.data === "") {
          return;
        } else {
          let response = res.data;
          setResult(response.slice(0, 5));
          response = response.slice(5);
          setLikePlace(response);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };
