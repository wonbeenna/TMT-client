import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const modalNameReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.MODAL_NAME: {
      return {
        modalName: action.payload,
      };
    }
    default:
      return state;
  }
};

export default modalNameReducer;
