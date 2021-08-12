import axios from "axios";
import requests from "../../../utils/requests";
import { accessToken } from "../../../../interface";

export const insertSpotReq =
  (place: any, startDate: any, endDate: any, accessToken: accessToken) =>
  () => {
    axios
      .post(
        requests.sendURL,
        {
          place,
          startDate,
          endDate,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => (window.location.href = "/Mypage"));
  };
