export type stateType = {
  isLogin: boolean;
  AccessToken: { accessToken: string; refreshToken: string };
  userInfo: {
    userName: string;
    email: string;
  };
  Range: {
    startDate: string;
    endDate: string;
  };
};

export const initialState = {
  isLogin: false,
  AccessToken: { accessToken: "", refreshToken: "" },
  userInfo: {
    userName: "",
    email: "",
  },
  Range: {
    startDate: "",
    endDate: "",
  },
};
