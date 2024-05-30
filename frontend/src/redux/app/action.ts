import { Moment } from 'moment';
import Enum from '../../utils/enum';
import { typedAction } from '../typed-action';

export const AppActionEnum = {
  SET_APP_BAR_TITLE: 'app/SET_APP_BAR_TITLE',
  SET_BREADCRUMBS: 'app/SET_BREADCRUMBS',
  ADD_BREADCRUMB: 'app/ADD_BREADCRUMB',
  SET_DATE_RANGE: 'app/SET_DATE_RANGE',
  RESET: 'RESET',
} as const;

export type AppActionEnum = Enum<typeof AppActionEnum>;

function setAppBarTitle(title: string) {
  return typedAction(AppActionEnum.SET_APP_BAR_TITLE, { title });
}

function setDateRange(range: {
  startDate?: Moment | null;
  endDate: Moment | null;
}) {
  return typedAction(AppActionEnum.SET_DATE_RANGE, range);
}

export type AppActionTypes =
  | ReturnType<typeof setAppBarTitle>
  | ReturnType<typeof setDateRange>
  | { type: typeof AppActionEnum.RESET };

export default { setAppBarTitle, setDateRange };
