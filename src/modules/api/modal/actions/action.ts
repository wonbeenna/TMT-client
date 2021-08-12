import { ACTIONS_MODAL } from "../../../actionsType";

export const modalActions = {
  modalStatus: (modalStatus: boolean) => {
    return {
      type: ACTIONS_MODAL.MODAL_STATUS,
      payload: modalStatus,
    };
  },
  modalName: (modalName: string) => {
    return {
      type: ACTIONS_MODAL.MODAL_NAME,
      payload: modalName,
    };
  },
};

export type ActionsType =
  | ReturnType<typeof modalActions.modalStatus>
  | ReturnType<typeof modalActions.modalName>;
