import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";
axios.defaults.withCredentials = true;
export const placeDataReq = () => (dispatch: any) => {
  axios
    .get(requests.listURL, {})
    .then((res) => dispatch(Actions.placeActions.placeData(res.data)));
};

export const searchPlaceReq =
  (province: any, theme: any) => (dispatch: any) => {
    axios
      .post(requests.listURL, {
        province,
        theme,
      })
      .then((res) => dispatch(Actions.placeActions.placeData(res.data)));
  };
