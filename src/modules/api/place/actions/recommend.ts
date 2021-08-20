import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";
import { place } from "../../../../interfaces/";
axios.defaults.withCredentials = true;

export const recommendReq =
  (place: place) =>
  async (dispatch: (type: { type: string; payload: {}[] }) => void) => {
    await axios
      .post(requests.recommendURL, {
        place: place,
      })
      .then((res) => {
        dispatch(Actions.placeActions.nextPlaceList(res.data));
      })
      .catch((err) => console.log(err));
  };
