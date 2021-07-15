export type stateType = {
  isLogin: boolean;
  AccessToken: { accessToken: string; refreshToken: string };
  modalStatus: boolean;
  modalName: string;
  listData: any;
  nextListData: any;
};

export const initialState = {
  isLogin: false,
  AccessToken: { accessToken: "", refreshToken: "" },
  modalStatus: false,
  modalName: "",
  listData: [],
  nextListData: [],
};
