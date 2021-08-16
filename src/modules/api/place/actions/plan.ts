import axios from "axios";
import { Actions } from "../..";
import requests from "../../../utils/requests";
axios.defaults.withCredentials = true;

export const planPostReq =
  (accessToken: string, myListData: any) => (dispatch: any) => {
    axios
      .post(
        requests.planURL,
        {
          place: myListData.spot,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(Actions.modalActions.modalName("ErrModal"));
        dispatch(Actions.modalActions.modalMessage(res.data.message));
      });
  };

export const planGetReq = () => (dispatch: any) => {
  axios.get(requests.planURL).then((res) => {
    dispatch(Actions.placeActions.planList(res.data));
  });
};

export const viewReq =
  (_id: any) =>
  (dispatch: (type: { type: string; payload: string[] }) => any) => {
    axios
      .get(requests.viewURL + `${_id}`)
      .then((res) => dispatch(Actions.placeActions.viewList(res.data)));
  };

export const planSearchReq =
  (province: any, checkItems: any) =>
  (dispatch: (type: { type: string; payload: string[] }) => any) => {
    axios
      .post(requests.planSearchURL, {
        province,
        theme: checkItems,
      })
      .then((res) => dispatch(Actions.placeActions.planList(res.data)));
  };
