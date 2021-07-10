import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserInfoReducer from "./UserInfoReducer";
import accessTokenReducer from "./accessTokenReducer";
import modalStatusReducer from "./modalStatusReducer";
import modalNameReducer from "./modalNameReducer";
import placeListReducer from "./placeListReducer";
import savePlaceListReducer from "./savePlaceListReducer";

export const rootReducer = combineReducers({
  LoginReducer,
  UserInfoReducer,
  accessTokenReducer,
  modalStatusReducer,
  modalNameReducer,
  placeListReducer,
  savePlaceListReducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
