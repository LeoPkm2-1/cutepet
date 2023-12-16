import Enum from '../../utils/enum';
import { typedAction } from '../typed-action';

export const NotiActionEnum = {
  SET_NUM_NOTI: 'noti/SET_NUM_NOTI',
  SET_NEW_NOTI: 'noti/SET_NEW_NOTI',
  SET_INCRE_NOTI: 'noti/SET_INCRE_NOTI',
  SET_NEW_ID: 'noti/SET_NEW_ID',
  RESET: 'RESET',
} as const;

export type NotiActionEnum = Enum<typeof NotiActionEnum>;
function setNumNoti(num: number) {
  return typedAction(NotiActionEnum.SET_NUM_NOTI, num);
}

function setIncreNumNoti() {
  return typedAction(NotiActionEnum.SET_INCRE_NOTI);
}

function setNewNoti() {
  return typedAction(NotiActionEnum.SET_NEW_NOTI);
}

function setNewId(id: string) {
  return typedAction(NotiActionEnum.SET_NEW_ID, id);
}
export type NotiActionTypes =
  | ReturnType<typeof setNumNoti>
  | ReturnType<typeof setNewNoti>
  | ReturnType<typeof setIncreNumNoti>
  | ReturnType<typeof setNewId>
  | { type: typeof NotiActionEnum.RESET };

export default { setNumNoti, setNewNoti, setIncreNumNoti, setNewId };
