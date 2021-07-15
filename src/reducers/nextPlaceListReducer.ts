import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const placeListReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.NEXT_PLACE_LIST: {
      return {
        ...state,
        nextListData: [...state.nextListData, action.payload].slice(-1),
      };
    }

    default:
      return state;
  }
};

export default placeListReducer;
