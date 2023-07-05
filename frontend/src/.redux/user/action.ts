import { UserProfile } from "../../models/user-profile";
import Enum from "../../utils/enum";
import { typedAction } from "../typed-action";

export const UserActionEnum = {
  SET_PROFILE: "user/SET_PROFILE",
  RESET: "RESET",
} as const;

export type UserActionEnum = Enum<typeof UserActionEnum>;

function setProfile(profile: UserProfile) {
  return typedAction(UserActionEnum.SET_PROFILE, profile);
}

export type UserActionTypes =
  | ReturnType<typeof setProfile>
  | { type: typeof UserActionEnum.RESET };

export default { setProfile };
