export const ACTIONS = {
  LOGIN_STATUS: "LOGIN_STATUS",
  USER_INFO: "USER_INFO",
  ACCESS_TOKEN: "ACCESS_TOKEN",
};

export const LoginStatus = (isLogin: boolean) => {
  return {
    type: ACTIONS.LOGIN_STATUS,
    payload: isLogin,
  };
};

export const UserInfo = (name: string, email: string) => {
  return {
    type: ACTIONS.USER_INFO,
    payload: { name, email },
  };
};

export const AccessToken = (accessToken: string, refreshToken: string) => {
  return {
    type: ACTIONS.ACCESS_TOKEN,
    payload: { accessToken, refreshToken },
  };
};
