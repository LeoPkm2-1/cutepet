import { UserProfile } from "../../models/user-profile";
import { UserActionEnum, UserActionTypes } from "./action";

type UserState = {
  profile?: UserProfile;
};

const initState = Object.freeze<UserState>({});

export default function (
  state = initState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case UserActionEnum.SET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case UserActionEnum.RESET: {
      return initState;
    }
    default: {
      return state;
    }
  }
}
