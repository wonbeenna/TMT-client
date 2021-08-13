import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";
import { place } from "../../../../interfaces/";
axios.defaults.withCredentials = true;

export const recommendReq =
  (place: place) =>
  (dispatch: (type: { type: string; payload: {}[] }) => void) => {
    axios
      .post(requests.recommendURL, {
        place: place,
      })
      .then((res) => {
        dispatch(Actions.placeActions.nextPlaceList(res.data));
      });
  };
