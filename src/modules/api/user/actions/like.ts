import axios from "axios";
import { Actions } from "../..";
import requests from "../../../utils/requests";
import { accessToken, likePhoto, place } from "../../../../interfaces/";

export const likeGetReq =
  (AccessToken: accessToken) =>
  async (dispatch: (type: { type: string; payload: string[] }) => void) => {
    await axios
      .get(requests.likeURL, {
        headers: {
          authorization: `Bearer ${AccessToken.accessToken}`,
        },
      })
      .then((res) => {
        if (!AccessToken.accessToken) {
          return;
        } else {
          dispatch(Actions.userActions.userLike(res.data.place));
        }
      });
  };

export const likeDeleteReq =
  (place: place, AccessToken: accessToken) => async () => {
    await axios
      .delete(requests.likeURL, {
        headers: {
          authorization: `Bearer ${AccessToken.accessToken}`,
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
  (place: place, AccessToken: accessToken) => async () => {
    await axios
      .post(
        requests.likeURL,
        {
          place: place,
        },
        {
          headers: {
            authorization: `Bearer ${AccessToken.accessToken}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  };

export const likePhotoReq =
  (
    { setResult, setLikePlace, setIsLoading }: likePhoto,
    AccessToken: accessToken
  ) =>
  async () => {
    await axios
      .get(requests.photoLikeURL, {
        headers: {
          authorization: `Bearer ${AccessToken.accessToken}`,
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
