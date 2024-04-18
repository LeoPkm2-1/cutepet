import { UserProfile } from "../../models/user-profile";
// import { UserActionEnum, UserActionTypes } from "./action";

// type UserState = {
//   profile?: UserProfile;
// };

const initState = {};

export default function (
  state = initState,
  action,
) {
  switch (action.type) {
    case "user/SET_PROFILE": {
      return {
        ...state,
        profile: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
