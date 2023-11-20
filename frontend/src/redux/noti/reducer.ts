import { FriendType } from '../../models/user';
import { UserProfile } from '../../models/user-profile';
import { NotiActionEnum, NotiActionTypes } from './action';

type NotiState = {
  numNoti: number;
  isHaveNewNoti: boolean;
};

const initState = Object.freeze<NotiState>({
  numNoti: 0,
  isHaveNewNoti: false,
});

export default function (
  state = initState,
  action: NotiActionTypes
): NotiState {
  switch (action.type) {
    case NotiActionEnum.SET_INCRE_NOTI: {
      return {
        ...state,
        numNoti: state.numNoti + 1,
      };
    }
    case NotiActionEnum.SET_NUM_NOTI: {
      return {
        ...state,
        numNoti: action.payload,
      };
    }

    case NotiActionEnum.SET_NEW_NOTI: {
      return {
        ...state,
        isHaveNewNoti: !state.isHaveNewNoti,
      };
    }

    case NotiActionEnum.RESET: {
      return initState;
    }
    default: {
      return state;
    }
  }
}
