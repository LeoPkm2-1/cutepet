import { UserProfile } from "../../models/user-profile";
import Enum from "../../utils/enum";
import { typedAction } from "../typed-action";

// export const UserActionEnum = {
//   SET_PROFILE: "user/SET_PROFILE",
//   RESET: "RESET",
// } as const;

// export type UserActionEnum = Enum<typeof UserActionEnum>;

function setProfile(profile) {
  return {
    type: "user/SET_PROFILE",
    payload: profile,
  }
}
function setProfile2(profile) {
  return {
    type: "user/SET_PROFILE",
    payload: profile,
  }
}

// export type UserActionTypes =
//   | ReturnType<typeof setProfile>
//   | { type: typeof UserActionEnum.RESET };

export default { setProfile,setProfile2 };
