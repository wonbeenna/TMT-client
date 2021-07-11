import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import accessTokenReducer from "./accessTokenReducer";
import modalStatusReducer from "./modalStatusReducer";
import modalNameReducer from "./modalNameReducer";
import placeListReducer from "./placeListReducer";

export const rootReducer = combineReducers({
  LoginReducer,
  accessTokenReducer,
  modalStatusReducer,
  modalNameReducer,
  placeListReducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
