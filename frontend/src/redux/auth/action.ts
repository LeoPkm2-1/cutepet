import { User } from 'firebase/auth';
import { Dispatch } from 'redux';
import authApi from '../../api/auth';
import { auth } from '../../firebase';
import storage from '../../helper/storage';
import Enum from '../../utils/enum';
import { RootState } from '../reducer';
import { typedAction } from '../typed-action';

export const AuthActionEnum = {
  SET_AUTH: 'auth/SET_MINDFULLY_AUTH',
  RESET: 'RESET',
} as const;

export type AuthActionEnum = Enum<typeof AuthActionEnum>;

function setAuth(auth: boolean) {
  console.log("set au nr");
  return typedAction(AuthActionEnum.SET_AUTH, auth);
}

export type UserActionTypes =
  | ReturnType<typeof setAuth>
  | { type: typeof AuthActionEnum.RESET };

export default { setAuth };
