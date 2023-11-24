import Enum from '../../utils/enum';
import { typedAction } from '../typed-action';

export const SocketActionEnum = {
  SET_ONLINE: 'socket/SET_SOCKET_ONLINE',
  SET_OFFLINE: 'socket/SET_SOCKET_OFFLINE',
  SET_ACCEPT_FRIEND: 'socket/SET_ACCEPT_FRIEND',
  RESET: 'RESET',
} as const;


export type SocketActionEnum = Enum<typeof SocketActionEnum>;
function setOnline(idUser: number | string) {
  return typedAction(SocketActionEnum.SET_ONLINE, idUser);
}

function setOffline(idUser: number | string) {
  return typedAction(SocketActionEnum.SET_OFFLINE, idUser);
}

function setAcceptFriend(idUser: number | string) {
  return typedAction(SocketActionEnum.SET_ACCEPT_FRIEND, idUser);
}

export type SocketActionTypes =
  | ReturnType<typeof setOnline>
  | ReturnType<typeof setOffline>
  | ReturnType<typeof setAcceptFriend>
  | { type: typeof SocketActionEnum.RESET };

export default { setOnline,setOffline,setAcceptFriend };
