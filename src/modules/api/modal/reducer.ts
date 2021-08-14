import { ACTIONS_MODAL } from "../../actionsType";
import { ActionsType } from "./actions/action";

export type stateType = {
  modalStatus: boolean;
  modalName: string;
  modalMessage: string;
};

export const initialState = {
  modalStatus: false,
  modalName: "",
  modalMessage: "",
};

export const modalNameReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS_MODAL.MODAL_NAME: {
      return {
        modalName: action.payload,
      };
    }
    default:
      return state;
  }
};

export const modalStatusReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS_MODAL.MODAL_STATUS: {
      return {
        modalStatus: action.payload,
      };
    }
    default:
      return state;
  }
};

export const modalMessageReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS_MODAL.MODAL_MESSAGE: {
      return {
        modalMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
