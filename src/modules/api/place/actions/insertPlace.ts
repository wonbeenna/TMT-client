import axios from "axios";
import { insertSpot, accessToken } from "../../../../interfaces";
import requests from "../../../utils/requests";

export const insertSpotReq =
  ({ lists, startToday, endToday }: insertSpot, accessToken: accessToken) =>
  () => {
    axios
      .post(
        requests.sendURL,
        {
          place: lists,
          startDate: startToday,
          endDate: endToday,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => (window.location.href = "/Mypage"));
  };
