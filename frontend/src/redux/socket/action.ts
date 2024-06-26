import { StatusType } from '../../models/post';
import { LoiMoiType } from '../../models/user';
import Enum from '../../utils/enum';
import { typedAction } from '../typed-action';

export const SocketActionEnum = {
  SET_ONLINE: 'socket/SET_SOCKET_ONLINE',
  SET_OFFLINE: 'socket/SET_SOCKET_OFFLINE',
  SET_ACCEPT_FRIEND: 'socket/SET_ACCEPT_FRIEND',
  SET_NEW_POST: 'socket/SET_NEW_POST',
  SET_NEW_REQUEST_ADDFRIEND: 'socket/SET_NEW_REQUEST_ADDFRIEND',
  SET_HAS_POST_ID: 'socket/SET_HAS_POST_ID',

  RESET: 'RESET',
} as const;


export type SocketActionEnum = Enum<typeof SocketActionEnum>;
function setOnline(idUser: number ) {
  return typedAction(SocketActionEnum.SET_ONLINE, idUser);
}

function setOffline(idUser: number) {
  return typedAction(SocketActionEnum.SET_OFFLINE, idUser);
}

function setAcceptFriend(idUser: number ) {
  return typedAction(SocketActionEnum.SET_ACCEPT_FRIEND, idUser);
}

function setNewPost(post: StatusType) {
  return typedAction(SocketActionEnum.SET_NEW_POST, post);
}

function setNewRequest(request: LoiMoiType) {
  return typedAction(SocketActionEnum.SET_NEW_REQUEST_ADDFRIEND, request);
}

function setHasPostId(id: string) {
  return typedAction(SocketActionEnum.SET_HAS_POST_ID, id);
}


export type SocketActionTypes =
  | ReturnType<typeof setOnline>
  | ReturnType<typeof setOffline>
  | ReturnType<typeof setAcceptFriend>
  | ReturnType<typeof setNewPost>
  | ReturnType<typeof setNewRequest>
  | ReturnType<typeof setHasPostId>
  | { type: typeof SocketActionEnum.RESET }


export default { setOnline,setOffline,setAcceptFriend,setNewPost,setNewRequest,setHasPostId };
