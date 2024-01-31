import Enum from '../../utils/enum';
import { typedAction } from '../typed-action';

export const ScrollActionEnum = {
  SET_END_PAGE_HOME: 'scroll/SET_END_PAGE_HOME',
  RESET: 'RESET',
} as const;

export type ScrollActionEnum = Enum<typeof ScrollActionEnum>;
function setEndPageHome(value: boolean) {
  return typedAction(ScrollActionEnum.SET_END_PAGE_HOME, value);
}

export type ScrollActionTypes =
  | ReturnType<typeof setEndPageHome>

  | { type: typeof ScrollActionEnum.RESET };

export default { setEndPageHome };
