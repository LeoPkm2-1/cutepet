import { User } from 'firebase/auth';
import { Dispatch } from 'redux';
import authApi from '../../api/auth';
import { auth } from '../../firebase';
import storage from '../../helper/storage';
import Enum from '../../utils/enum';
import { RootState } from '../reducer';
import { typedAction } from '../typed-action';

export const AuthActionEnum = {
  SET_MINDFULLY_AUTH: 'auth/SET_MINDFULLY_AUTH',
  SET_FIREBASE_AUTH_LOADING: 'auth/SET_FIREBASE_AUTH_LOADING',
  SET_FIREBASE_USER: 'auth/SET_FIREBASE_USER',
  RESET: 'RESET',
} as const;

export type AuthActionEnum = Enum<typeof AuthActionEnum>;

function setAuth(auth: boolean) {
  return typedAction(AuthActionEnum.SET_MINDFULLY_AUTH, auth);
}

function setFirebaseAuthLoading(loading: boolean) {
  return typedAction(AuthActionEnum.SET_FIREBASE_AUTH_LOADING, loading);
}

function setFirebaseUser(user?: User | null) {
  return typedAction(AuthActionEnum.SET_FIREBASE_USER, user);
}

function firebaseAuthInit() {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const unsubs = auth.onAuthStateChanged((user) => {
      console.log(user);
      const authState = getState().auth;
      if (user?.uid !== authState.firebaseUser?.uid) {
        dispatch(setFirebaseUser(user));
      }
      if (authState.firebaseAuthLoading) {
        dispatch(setFirebaseAuthLoading(false));
      }
    }, console.error);
  };
}

function logout() {
  return (dispatch: Dispatch) => {
    return authApi.logout().finally(() => {
      storage.setTokens();
      auth.signOut();
      return dispatch(typedAction(AuthActionEnum.RESET));
    });
  };
}

export type UserActionTypes =
  | ReturnType<typeof setAuth>
  | ReturnType<typeof setFirebaseAuthLoading>
  | ReturnType<typeof setFirebaseUser>
  | { type: typeof AuthActionEnum.RESET };

export default { setAuth, logout, firebaseAuthInit };
