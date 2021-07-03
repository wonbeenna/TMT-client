import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserInfoReducer from "./UserInfoReducer";
import accessTokenReducer from "./accessTokenReducer";
import RangeControllerReducer from "./RangeController";

const rootReducer = combineReducers({
  LoginReducer,
  UserInfoReducer,
  accessTokenReducer,
  RangeControllerReducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
