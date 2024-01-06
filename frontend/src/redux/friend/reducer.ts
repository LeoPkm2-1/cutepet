import { FriendType } from "../../models/user";
import { UserProfile } from "../../models/user-profile";
import { FriendActionEnum, FriendActionTypes } from "./action";

type FriendState = {
  friend?: FriendType[];
  isChangeFriend?: boolean;
};

const initState = Object.freeze<FriendState>({});

export default function (
  state = initState,
  action: FriendActionTypes
): FriendState {
  switch (action.type) {
    case FriendActionEnum.SET_FRIEND: {
      return {
        ...state,
        friend: action.payload,
      };
    }
    case FriendActionEnum.SET_CHANGE_FRIEND: {
      return {
        ...state,
        isChangeFriend: action.payload,
      };
    }
    case FriendActionEnum.RESET: {
      return initState;
    }
    default: {
      return state;
    }
  }
}
