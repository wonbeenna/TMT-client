import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const placeListReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.PLACE_LIST: {
      return Object.assign({}, state, {
        listData: [...state.listData, action.payload],
      });
    }
    default:
      return state;
  }
};

export default placeListReducer;
