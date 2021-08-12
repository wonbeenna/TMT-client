import { modalActions } from "./modal";
import {
  userActions,
  signInReq,
  signUpReq,
  nonUserReq,
  googleReq,
  kakaoReq,
  userInfoPostReq,
  userInfoGetReq,
  likeGetReq,
  likeDeleteReq,
  likePostReq,
  withDrawReq,
} from "./user/";
import {
  placeActions,
  myPlaceListReq,
  placeDataReq,
  searchPlaceReq,
  recommendReq,
} from "./place";

export const Actions = {
  modalActions,
  userActions,
  placeActions,
  signInReq,
  signUpReq,
  nonUserReq,
  googleReq,
  kakaoReq,
  userInfoPostReq,
  userInfoGetReq,
  withDrawReq,
  likeGetReq,
  likeDeleteReq,
  likePostReq,
  myPlaceListReq,
  placeDataReq,
  searchPlaceReq,
  recommendReq,
};
