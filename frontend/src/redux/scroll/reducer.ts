import { ScrollActionEnum, ScrollActionTypes } from './action';

type ScrollState = {
  endPageHome: boolean;
};

const initState = Object.freeze<ScrollState>({
  endPageHome: false,
});

export default function (
  state = initState,
  action: ScrollActionTypes
): ScrollState {
  switch (action.type) {
    case ScrollActionEnum.SET_END_PAGE_HOME: {
      return {
        ...state,
        endPageHome: action.payload,
      };
    }

    case ScrollActionEnum.RESET: {
      return initState;
    }
    default: {
      return state;
    }
  }
}
