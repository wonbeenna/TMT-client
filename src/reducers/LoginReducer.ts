import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const LoginReducer = (state: stateType = initialState, action: ActionsType) => {
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
