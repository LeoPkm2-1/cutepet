import { UserProfile } from "../../models/user-profile";
import { TodoListActionTypes,TodoListActionEnum } from "./action";

type UserState = {
  profile?:any;
};

const initState = Object.freeze<UserState>({});

export default function (
  state = initState,
  action: TodoListActionTypes
){
  switch (action.type) {
    case TodoListActionEnum.SET_TODO_LIST: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case TodoListActionEnum.RESET: {
      return initState;
    }
    default: {
      return state;
    }
  }
}
