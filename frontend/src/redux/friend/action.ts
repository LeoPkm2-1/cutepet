import { FriendType } from '../../models/user';
import Enum from '../../utils/enum';
import { typedAction } from '../typed-action';

export const FriendActionEnum = {
  SET_FRIEND: 'friend/SET_FRIEND',
  SET_CHANGE_FRIEND: 'friend/SET_CHANGE_FRIEND',
  RESET: 'RESET',
} as const;

export type FriendActionEnum = Enum<typeof FriendActionEnum>;
function setFriend(friend: FriendType[]) {
  return typedAction(FriendActionEnum.SET_FRIEND, friend);
}

function setChangeFriend(isChange: boolean) {
  return typedAction(FriendActionEnum.SET_CHANGE_FRIEND, isChange);
}

export type FriendActionTypes =
  | ReturnType<typeof setFriend>
  | ReturnType<typeof setChangeFriend>
  | { type: typeof FriendActionEnum.RESET };

export default { setFriend,setChangeFriend };
