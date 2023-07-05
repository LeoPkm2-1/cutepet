import moment, { Moment } from 'moment';
import { AppActionEnum, AppActionTypes } from './action';

type AppState = {
  title: string;
  dateRange?: {
    startDate?: Moment | null;
    endDate?: Moment | null;
  };
};

const initState = Object.freeze<AppState>({
  title: '',
  dateRange: {
    startDate: moment().startOf('day').subtract(7, 'days'),
    endDate: moment().startOf('day'),
  },
});

export default function (state = initState, action: AppActionTypes): AppState {
  switch (action.type) {
    case AppActionEnum.SET_APP_BAR_TITLE: {
      return {
        ...state,
        title: action.payload.title,
      };
    }
    case AppActionEnum.SET_DATE_RANGE: {
      return {
        ...state,
        dateRange: action.payload,
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
