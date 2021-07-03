import { ACTIONS } from "../actions/index";
import { initialState } from "./initialState";

const RangeControllerReducer = (state = initialState, action: any) => {
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
