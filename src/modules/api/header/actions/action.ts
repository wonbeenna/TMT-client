import { ACTIONS_HEADER } from "../../../actionsType";

export const headerActions = {
  headerStatus: (headerStatus: string) => {
    return {
      type: ACTIONS_HEADER.HEADER_STATUS,
      payload: headerStatus,
    };
  },
};

export type ActionsType = ReturnType<typeof headerActions.headerStatus>;
