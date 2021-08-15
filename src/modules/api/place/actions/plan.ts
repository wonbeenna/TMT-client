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
        console.log(res);
      });
  };

export const planGetReq = () => (dispatch: any) => {
  axios.get(requests.planURL).then((res) => {
    dispatch(Actions.placeActions.planList(res.data));
  });
};
