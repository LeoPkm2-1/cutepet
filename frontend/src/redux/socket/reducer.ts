import { StatusType } from '../../models/post';
import { FriendType, LoiMoiType } from '../../models/user';
import { UserProfile } from '../../models/user-profile';
import { SocketActionEnum, SocketActionTypes } from './action';

type SocketState = {
  onLine: {
    idUser: number| string;
  };
  offLine: {
    idUser: number| string;
  };
  acceptFriend: {
    idUser: number| string;
  };
  newPost: { post: StatusType },
  newRequestAddFriend: { request: LoiMoiType },

};

const initState = Object.freeze<SocketState>({
  onLine: {idUser : 0},
  offLine: {idUser : 0},
  acceptFriend: {idUser : 0},
  newPost: { post: {} },
  newRequestAddFriend: { request: {} },

});

export default function (
  state = initState,
  action: SocketActionTypes
): SocketState {
  switch (action.type) {
    case SocketActionEnum.SET_ONLINE: {
      return {
        ...state,
        onLine: {
          idUser: action.payload
        }
      };
    }
    case SocketActionEnum.SET_OFFLINE: {
      return {
        ...state,
        offLine: {
          idUser: action.payload
        }
      };
    }

    case SocketActionEnum.SET_ACCEPT_FRIEND: {
      return {
        ...state,
        acceptFriend: {
          idUser: action.payload
        }
      };
    }

    case SocketActionEnum.SET_NEW_POST: {
      return {
        ...state,
        newPost: {
          post: action.payload
        }
      };
    }
    case SocketActionEnum.SET_NEW_REQUEST_ADDFRIEND: {
      return {
        ...state,
        newRequestAddFriend: {
          request: action.payload
        }
      };
    }
  
  
    case SocketActionEnum.RESET: {
      return initState;
    }
    default: {
      return state;
    }
  }
}
