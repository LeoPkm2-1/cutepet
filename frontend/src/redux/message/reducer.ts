import { MessageType } from '../../models/message';
import { FriendType } from '../../models/user';
import { UserProfile } from '../../models/user-profile';
import { MessageActionEnum, MessageActionTypes } from './action';

type MessageState = {
  mes?: MessageType;
};

const initState = Object.freeze<MessageState>({});

export default function (
  state = initState,
  action: MessageActionTypes
): MessageState {
  switch (action.type) {
    case MessageActionEnum.SET_NEW_MASSEGE: {
      return {
        ...state,
        mes: action.payload,
      };
    }

    case MessageActionEnum.RESET: {
      return initState;
    }
    default: {
      return state;
    }
  }
}
