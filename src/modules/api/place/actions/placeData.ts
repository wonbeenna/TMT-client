import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";
import { theme } from "../../../../interfaces/";
axios.defaults.withCredentials = true;
export const placeDataReq =
  () => async (dispatch: (type: { type: string; payload: {}[] }) => void) => {
    await axios
      .get(requests.listURL, {})
      .then((res) => dispatch(Actions.placeActions.placeData(res.data)));
  };

export const searchPlaceReq =
  ({ province, checkItems }: theme) =>
  async (dispatch: (type: { type: string; payload: {}[] }) => void) => {
    await axios
      .post(requests.listURL, {
        province,
        theme: checkItems,
      })
      .then((res) => dispatch(Actions.placeActions.placeData(res.data)));
  };
