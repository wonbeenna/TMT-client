import axios from "axios";
import requests from "../../../utils/requests";
import { accessToken } from "../../../../interface";
import { Actions } from "../..";
axios.defaults.withCredentials = true;

export const recommendReq = (place: any) => (dispatch: any) => {
  axios
    .post(requests.recommendURL, {
      place: place,
    })
    .then((res) => {
      console.log(res.data);
      dispatch(Actions.placeActions.nextPlaceList(res.data));
    });
};
