import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";

export const myPlaceListReq = (accessToken: string) => (dispatch: any) => {
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
