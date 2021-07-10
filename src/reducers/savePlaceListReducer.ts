import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const savePlaceListReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.SAVE_PLACE_LIST: {
      return {
        ...state,
        place: [...state.place, action.payload].slice(-1)[0],
      };
    }
    default:
      return state;
  }
};

export default savePlaceListReducer;
