import storage from "../../helper/storage";
import { UserProfile } from "../../models/user-profile";
import { AuthActionEnum, UserActionTypes } from "./action";

type AuthState = {
  auth: boolean;
};

const initState = Object.freeze<AuthState>({
  auth: !!storage.getTokens(),
});

export default function (
  state = initState,
  action: UserActionTypes
): AuthState {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH: {
      return {
        ...state,
        auth: action.payload,
      };
    }
    case AuthActionEnum.RESET: {
      return { ...initState, auth: false };
    }
    default: {
      return state;
    }
  }
}
