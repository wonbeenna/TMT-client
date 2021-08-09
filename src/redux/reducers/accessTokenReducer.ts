import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const accessTokenReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
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
