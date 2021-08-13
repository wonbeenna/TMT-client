import { ACTIONS_PLACE } from "../../../actionsType";

export const placeActions = {
  placeList: (listData: Array<{}>) => {
    return {
      type: ACTIONS_PLACE.PLACE_LIST,
      payload: listData,
    };
  },

  nextPlaceList: (nextListData: Array<{}>) => {
    return {
      type: ACTIONS_PLACE.NEXT_PLACE_LIST,
      payload: nextListData,
    };
  },

  myPlaceList: (spot: string[], startDate: string, endDate: string) => {
    return {
      type: ACTIONS_PLACE.MY_PLACE_LIST,
      payload: { spot, startDate, endDate },
    };
  },

  placeData: (placeData: Array<{}>) => {
    return {
      type: ACTIONS_PLACE.PLACE_DATA,
      payload: placeData,
    };
  },
};
export type ActionsType =
  | ReturnType<typeof placeActions.placeList>
  | ReturnType<typeof placeActions.nextPlaceList>
  | ReturnType<typeof placeActions.myPlaceList>
  | ReturnType<typeof placeActions.placeData>;
