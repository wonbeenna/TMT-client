import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const RangeControllerReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.RANGE_CONTROLLER: {
      return {
        Range: action.payload,
      };
    }
    default:
      return state;
  }
};

export default RangeControllerReducer;
