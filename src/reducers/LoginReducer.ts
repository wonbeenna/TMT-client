import { ACTIONS } from "../actions/index";
import { initialState } from "./initialState";

const LoginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTIONS.LOGIN_STATUS: {
      return {
        isLogin: action.payload,
      };
    }
    default:
      return state;
  }
};

export default LoginReducer;
