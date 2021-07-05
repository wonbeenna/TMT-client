import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const UserInfoReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
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
