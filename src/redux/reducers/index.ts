import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import accessTokenReducer from "./accessTokenReducer";
import modalStatusReducer from "./modalStatusReducer";
import modalNameReducer from "./modalNameReducer";
import placeListReducer from "./placeListReducer";
import nextPlaceListReducer from "./nextPlaceListReducer";

export const rootReducer = combineReducers({
  LoginReducer,
  accessTokenReducer,
  modalStatusReducer,
  modalNameReducer,
  placeListReducer,
  nextPlaceListReducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
