import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";
import { theme } from "../../../../interfaces/";
axios.defaults.withCredentials = true;
export const placeDataReq =
  () => (dispatch: (type: { type: string; payload: {}[] }) => void) => {
    axios
      .get(requests.listURL, {})
      .then((res) => dispatch(Actions.placeActions.placeData(res.data)));
  };

export const searchPlaceReq =
  ({ province, checkItems }: theme) =>
  (dispatch: (type: { type: string; payload: {}[] }) => void) => {
    axios
      .post(requests.listURL, {
        province,
        theme: checkItems,
      })
      .then((res) => dispatch(Actions.placeActions.placeData(res.data)));
  };
