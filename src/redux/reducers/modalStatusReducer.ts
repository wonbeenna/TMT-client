import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const modalStatusReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.MODAL_STATUS: {
      return {
        modalStatus: action.payload,
      };
    }
    default:
      return state;
  }
};

export default modalStatusReducer;
