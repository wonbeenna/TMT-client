import { combineReducers } from "redux";
import {
  accessTokenReducer,
  LoginReducer,
  userInfoReducer,
  userLikeReducer,
  userLikePhotoReducer,
} from "../modules/api/user";
import { modalStatusReducer, modalNameReducer } from "../modules/api/modal";
import {
  placeListReducer,
  NextPlaceListReducer,
  myPlaceListReducer,
  placeDataReducer,
} from "../modules/api/place";

export const rootReducer = combineReducers({
  LoginReducer,
  userInfoReducer,
  accessTokenReducer,
  userLikeReducer,
  userLikePhotoReducer,
  modalStatusReducer,
  modalNameReducer,
  placeListReducer,
  NextPlaceListReducer,
  myPlaceListReducer,
  placeDataReducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
