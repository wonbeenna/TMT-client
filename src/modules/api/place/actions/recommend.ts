import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";
axios.defaults.withCredentials = true;

export const recommendReq = (place: any) => (dispatch: any) => {
  axios
    .post(requests.recommendURL, {
      place: place,
    })
    .then((res) => {
      dispatch(Actions.placeActions.nextPlaceList(res.data));
    });
};
