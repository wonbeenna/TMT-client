import { ACTIONS_HEADER } from "../../actionsType";
import { ActionsType } from "./actions/action";

export type stateType = {
  headerStatus: string;
};

export const initialState = {
  headerStatus: "",
};

export const headerReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS_HEADER.HEADER_STATUS: {
      return {
        headerStatus: action.payload,
      };
    }
    default:
      return state;
  }
};
