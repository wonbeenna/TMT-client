import { combineReducers } from "redux";
import {
  accessTokenReducer,
  LoginReducer,
  userInfoReducer,
  userLikeReducer,
  userLikePhotoReducer,
} from "../modules/api/user";
import {
  modalStatusReducer,
  modalNameReducer,
  modalMessageReducer,
} from "../modules/api/modal";
import {
  placeListReducer,
  NextPlaceListReducer,
  myPlaceListReducer,
  placeDataReducer,
  planListReducer,
} from "../modules/api/place";
import { headerReducer } from "../modules/api/header";

export const rootReducer = combineReducers({
  LoginReducer,
  userInfoReducer,
  accessTokenReducer,
  userLikeReducer,
  userLikePhotoReducer,
  modalStatusReducer,
  modalNameReducer,
  modalMessageReducer,
  placeListReducer,
  NextPlaceListReducer,
  myPlaceListReducer,
  placeDataReducer,
  headerReducer,
  planListReducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
