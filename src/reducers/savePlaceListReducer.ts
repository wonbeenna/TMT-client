import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const savePlaceListReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.SAVE_PLACE_LIST: {
      return Object.assign({}, state, {
        place: [...state.place, action.payload],
      });
    }
    default:
      return state;
  }
};

export default savePlaceListReducer;
