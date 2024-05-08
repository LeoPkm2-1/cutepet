import { AppActionEnum, AppActionTypes } from "./action";

type AppState = {
  title: string;
};

const initState = Object.freeze<AppState>({
  title: "",
});

export default function (state = initState, action: AppActionTypes): AppState {
  switch (action.type) {
    case AppActionEnum.SET_APP_BAR_TITLE: {
      return {
        ...state,
        title: action.payload.title,
      };
    }
    case AppActionEnum.RESET: {
      return initState;
    }
    default: {
      return state;
    }
  }
}
