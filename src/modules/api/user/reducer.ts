import { ACTIONS_USER } from "../../actionsType";

export type stateType = {
  isLogin: boolean;
  userInfo: { name: string; email: string };
  AccessToken: { accessToken: string; refreshToken: string };
  userLike: any;
  userLikePhoto: any;
};

export const initialState = {
  isLogin: false,
  userInfo: { name: "", email: "" },
  AccessToken: { accessToken: "", refreshToken: "" },
  userLike: [],
  userLikePhoto: [],
};

export const LoginReducer = (
  state: stateType = initialState,
  action: { type: string; payload: boolean }
) => {
  switch (action.type) {
    case ACTIONS_USER.LOGIN_STATUS: {
      return {
        isLogin: action.payload,
      };
    }
    default:
      return state;
  }
};

export const accessTokenReducer = (
  state: stateType = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case ACTIONS_USER.ACCESS_TOKEN: {
      return {
        AccessToken: action.payload,
      };
    }
    default:
      return state;
  }
};

export const userInfoReducer = (
  state: stateType = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case ACTIONS_USER.USER_INFO: {
      return {
        userInfo: action.payload,
      };
    }
    default:
      return state;
  }
};

export const userLikeReducer = (
  state: stateType = initialState,
  action: { type: string; payload: Array<string> }
) => {
  switch (action.type) {
    case ACTIONS_USER.USER_LIKE: {
      return {
        ...state,
        userLike: action.payload,
      };
    }
    default:
      return state;
  }
};

export const userLikePhotoReducer = (
  state: stateType = initialState,
  action: { type: string; payload: Array<string> }
) => {
  switch (action.type) {
    case ACTIONS_USER.USER_LIKE_PHOTO: {
      return {
        ...state,
        userLikePhoto: action.payload,
      };
    }
    default:
      return state;
  }
};
