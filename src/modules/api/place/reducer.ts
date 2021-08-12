import { ACTIONS_PLACE } from "../../actionsType";

export type stateType = {
  listData: Array<{}>;
  nextListData: Array<{}>;
  myPlaceList: object;
  placeData: Array<{}>;
};

export const initialState = {
  listData: [],
  nextListData: [],
  myPlaceList: {},
  placeData: [],
};

export const placeListReducer = (
  state: stateType = initialState,
  action: { type: string; payload: Array<string> }
) => {
  switch (action.type) {
    case ACTIONS_PLACE.PLACE_LIST: {
      return {
        ...state,
        listData: [...state.listData, action.payload].slice(-1),
      };
    }

    default:
      return state;
  }
};

export const NextPlaceListReducer = (
  state: stateType = initialState,
  action: { type: string; payload: Array<string> }
) => {
  switch (action.type) {
    case ACTIONS_PLACE.NEXT_PLACE_LIST: {
      return {
        ...state,
        nextListData: [...state.nextListData, action.payload].slice(-1),
      };
    }

    default:
      return state;
  }
};

export const myPlaceListReducer = (
  state: stateType = initialState,
  action: { type: string; payload: Array<string> }
) => {
  switch (action.type) {
    case ACTIONS_PLACE.MY_PLACE_LIST: {
      return {
        ...state,
        myListData: action.payload,
      };
    }

    default:
      return state;
  }
};

export const placeDataReducer = (
  state: stateType = initialState,
  actions: { type: string; payload: Array<string> }
) => {
  switch (actions.type) {
    case ACTIONS_PLACE.PLACE_DATA: {
      return {
        ...state,
        placeData: actions.payload,
      };
    }
    default:
      return state;
  }
};
