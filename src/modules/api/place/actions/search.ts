import axios from "axios";
import requests from "../../../utils/requests";
import { accessToken } from "../../../../interface";
import { Actions } from "../..";

export const myPlaceListReq = (accessToken: accessToken) => (dispatch: any) => {
  axios
    .get(requests.searchURL, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) =>
      dispatch(
        Actions.placeActions.myPlaceList(
          res.data?.spot,
          res.data?.startDate,
          res.data?.endDate
        )
      )
    );
};

// export const myPlaceMapReq = (accessToken: accessToken) => (dispatch: any) => {
//   axios.get(requests.searchURL, {
//     headers: {
//       authorization: `Bearer ${accessToken}`,
//     },
//   }).then(res => dispatch(Actions.placeActions.myPlaceList))
// };
