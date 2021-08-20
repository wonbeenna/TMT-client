import axios from "axios";
import { Actions } from "../..";
import { accessToken } from "../../../../interfaces";
import requests from "../../../utils/requests";
axios.defaults.withCredentials = true;

export const planPostReq =
  (AccessToken: accessToken, myListData: any) =>
  async (dispatch: (type: { type: string; payload: string }) => void) => {
    await axios
      .post(
        requests.planURL,
        {
          place: myListData.spot,
        },
        {
          headers: {
            authorization: `Bearer ${AccessToken.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(res.data.message));
      });
  };

export const planGetReq =
  () => async (dispatch: (type: { type: string; payload: object }) => void) => {
    await axios.get(requests.planURL).then((res) => {
      dispatch(Actions.placeActions.planList(res.data.data));
    });
  };

export const planSearchReq =
  (province: string, checkItems: Array<string>) =>
  async (dispatch: (type: { type: string; payload: object }) => any) => {
    await axios
      .post(requests.planSearchURL, {
        province,
        theme: checkItems,
      })
      .then((res) => dispatch(Actions.placeActions.planList(res.data.data)));
  };

export const planDeleteReq =
  (_id: string, AccessToken: accessToken) =>
  async (
    dispatch: (type: { type: string; payload: string | boolean }) => void
  ) => {
    await axios
      .delete(requests.planURL, {
        headers: {
          authorization: `Bearer ${AccessToken.accessToken}`,
        },
        data: {
          _id: _id,
        },
      })
      .then((res) => {
        dispatch(Actions.modalActions.modalStatus(true));
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage("경로가 삭제되었습니다."));
      });
  };
