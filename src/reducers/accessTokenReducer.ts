import { ACTIONS } from "../actions/index";
import { initialState } from "./initialState";

const accessTokenReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTIONS.ACCESS_TOKEN: {
      return {
        AccessToken: action.payload,
      };
    }
    default:
      return state;
  }
};

export default accessTokenReducer;
