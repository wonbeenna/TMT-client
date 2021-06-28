import { ACTIONS } from "../actions/index";
import { initialState } from "./initialState";

const UserInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTIONS.USER_INFO: {
      return {
        userInfo: action.payload,
      };
    }
    default:
      return state;
  }
};

export default UserInfoReducer;
