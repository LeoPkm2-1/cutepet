import { MessageType } from '../../models/message';
import Enum from '../../utils/enum';
import { typedAction } from '../typed-action';

export const MessageActionEnum = {
  SET_NEW_MASSEGE: 'friend/SET_NEW_MASSEGE',
  RESET: 'RESET',
} as const;

export type MessageActionEnum = Enum<typeof MessageActionEnum>;
function setNewMessage(mes: MessageType) {
  return typedAction(MessageActionEnum.SET_NEW_MASSEGE, mes);
}


export type MessageActionTypes =
  | ReturnType<typeof setNewMessage>
  | { type: typeof MessageActionEnum.RESET };

export default { setNewMessage };
