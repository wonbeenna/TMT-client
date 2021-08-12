import { ACTIONS_USER } from "../../../actionsType";

export const userActions = {
  LoginStatus: (isLogin: boolean) => {
    return {
      type: ACTIONS_USER.LOGIN_STATUS,
      payload: isLogin,
    };
  },
  userInfo: (name: string, email: string) => {
    return {
      type: ACTIONS_USER.USER_INFO,
      payload: { name, email },
    };
  },
  AccessToken: (accessToken: string, refreshToken: string) => {
    return {
      type: ACTIONS_USER.ACCESS_TOKEN,
      payload: { accessToken, refreshToken },
    };
  },
  userLike: (userLike: Array<string>) => {
    return {
      type: ACTIONS_USER.USER_LIKE,
      payload: userLike,
    };
  },
  userLikePhoto: (userLikePhoto: Array<string>) => {
    return {
      type: ACTIONS_USER.USER_LIKE_PHOTO,
      payload: userLikePhoto,
    };
  },
};

export type ActionsType =
  | ReturnType<typeof userActions.LoginStatus>
  | ReturnType<typeof userActions.userInfo>
  | ReturnType<typeof userActions.AccessToken>
  | ReturnType<typeof userActions.userLike>
  | ReturnType<typeof userActions.userLikePhoto>;
