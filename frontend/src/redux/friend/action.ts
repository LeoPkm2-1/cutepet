import { FriendType } from '../../models/user';
import Enum from '../../utils/enum';
import { typedAction } from '../typed-action';

export const FriendActionEnum = {
  SET_FRIEND: 'friend/SET_FRIEND',
  RESET: 'RESET',
} as const;

export type FriendActionEnum = Enum<typeof FriendActionEnum>;
function setFriend(friend: FriendType[]) {
  return typedAction(FriendActionEnum.SET_FRIEND, friend);
}

export type FriendActionTypes =
  | ReturnType<typeof setFriend>
  | { type: typeof FriendActionEnum.RESET };

export default { setFriend };
