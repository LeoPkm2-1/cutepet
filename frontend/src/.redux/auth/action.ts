import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import authApi from "../../api/auth";
import storage from "../../helper/storage";
import { UserProfile } from "../../models/user-profile";
import Enum from "../../utils/enum";
import { typedAction } from "../typed-action";

export const AuthActionEnum = {
  SET_AUTH: "auth/SET_AUTH",
  RESET: "RESET",
} as const;

export type AuthActionEnum = Enum<typeof AuthActionEnum>;

function setAuth(auth: boolean) {
  return typedAction(AuthActionEnum.SET_AUTH, auth);
}



export type UserActionTypes =
  | ReturnType<typeof setAuth>
  | { type: typeof AuthActionEnum.RESET };

export default { setAuth };
