import { ActionsType } from "./actions/action";
import { ACTIONS_PLACE } from "../../actionsType";

export type stateType = {
  listData: Array<[]>;
  nextListData: Array<{}>;
  myPlaceList: object;
  placeData: Array<{}>;
  planList: Array<[]>;
  viewList: Array<[]>;
};

export const initialState = {
  listData: [],
  nextListData: [],
  myPlaceList: {},
  placeData: [],
  planList: [],
  viewList: [],
};

export const placeListReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS_PLACE.PLACE_LIST: {
      return {
        ...state,
        listData: action.payload,
      };
    }

    default:
      return state;
  }
};

export const NextPlaceListReducer = (
  state: stateType = initialState,
  action: ActionsType
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
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS_PLACE.MY_PLACE_LIST: {
      return {
        ...state,
        myPlaceList: action.payload,
      };
    }

    default:
      return state;
  }
};

export const placeDataReducer = (
  state: stateType = initialState,
  actions: ActionsType
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

export const planListReducer = (
  state: stateType = initialState,
  actions: ActionsType
) => {
  switch (actions.type) {
    case ACTIONS_PLACE.PLAN_LIST: {
      return {
        ...state,
        planList: actions.payload,
      };
    }
    default:
      return state;
  }
};
