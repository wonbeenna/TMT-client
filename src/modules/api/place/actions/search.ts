import axios from "axios";
import requests from "../../../utils/requests";
import { Actions } from "../..";
import { accessToken, inputElement } from "../../../../interfaces";

export const myPlaceListReq =
  (AccessToken: accessToken) =>
  async (
    dispatch: (type: {
      type: string;
      payload: { spot: object; startDate: string; endDate: string };
    }) => any
  ) => {
    await axios
      .get(requests.searchURL, {
        headers: {
          authorization: `Bearer ${AccessToken.accessToken}`,
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

export const searchSpotPostReq =
  ({ search, setSearch }: inputElement) =>
  async (dispatch: (type: { type: string; payload: {}[] }) => void) => {
    await axios
      .post(requests.spotURL, {
        inputElement: search,
      })
      .then((res) => {
        dispatch(Actions.placeActions.placeData([res.data]));
        setSearch("");
      });
  };

export const searchSpotGetReq = (setSpot: any) => async () => {
  await axios.get(requests.spotURL).then((res) => {
    setSpot(res.data);
  });
};
