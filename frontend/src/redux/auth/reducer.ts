import { User } from "firebase/auth";
import { auth } from "../../firebase";
import storage from "../../helper/storage";
import { AuthActionEnum, UserActionTypes } from "./action";

type AuthState = {
  mindfullyAuth: boolean;
  firebaseAuthLoading: boolean;
  firebaseUser?: User | null;
};

const initState = Object.freeze<AuthState>({
  mindfullyAuth: !!storage.getTokens(),
  firebaseAuthLoading: true,
  firebaseUser: auth.currentUser,
});

export default function (
  state = initState,
  action: UserActionTypes
): AuthState {
  switch (action.type) {
    case AuthActionEnum.SET_MINDFULLY_AUTH: {
      return {
        ...state,
        mindfullyAuth: action.payload,
      };
    }
    case AuthActionEnum.SET_FIREBASE_AUTH_LOADING: {
      return {
        ...state,
        firebaseAuthLoading: action.payload,
      };
    }
    case AuthActionEnum.SET_FIREBASE_USER: {
      return {
        ...state,
        firebaseUser: action.payload,
      };
    }
    case AuthActionEnum.RESET: {
      return { ...initState, mindfullyAuth: false, firebaseAuthLoading: false };
    }
    default: {
      return state;
    }
  }
}
