export const ACTIONS = {
  LOGIN_STATUS: "LOGIN_STATUS",
  USER_INFO: "USER_INFO",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  MODAL_STATUS: "MODAL_STATUS",
  MODAL_NAME: "MODAL_NAME",
  PLACE_LIST: "PLACE_LIST",
};

export const Actions = {
  LoginStatus: (isLogin: boolean) => {
    return {
      type: ACTIONS.LOGIN_STATUS,
      payload: isLogin,
    };
  },

  UserInfo: (name: string, email: string) => {
    return {
      type: ACTIONS.USER_INFO,
      payload: { name, email },
    };
  },

  AccessToken: (accessToken: string, refreshToken: string) => {
    return {
      type: ACTIONS.ACCESS_TOKEN,
      payload: { accessToken, refreshToken },
    };
  },

  modalStatus: (modalStatus: boolean) => {
    return {
      type: ACTIONS.MODAL_STATUS,
      payload: modalStatus,
    };
  },

  modalName: (modalName: string) => {
    return {
      type: ACTIONS.MODAL_NAME,
      payload: modalName,
    };
  },

  placeList: (listData: any) => {
    return {
      type: ACTIONS.PLACE_LIST,
      payload: listData,
    };
  },
};

export type ActionsType =
  | ReturnType<typeof Actions.LoginStatus>
  | ReturnType<typeof Actions.UserInfo>
  | ReturnType<typeof Actions.AccessToken>
  | ReturnType<typeof Actions.modalStatus>
  | ReturnType<typeof Actions.modalName>
  | ReturnType<typeof Actions.placeList>;
