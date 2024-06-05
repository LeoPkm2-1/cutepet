import { GroupActionEnum, GroupActionTypes } from "./action";


export interface Option {
    label: string;
    value: number | string;
    items?: Option[];
  }
type DataGroupState = {
  dataGroup?: Option[];
};

const initState = Object.freeze<DataGroupState>({});

export default function (
  state = initState,
  action: GroupActionTypes
): DataGroupState {
  switch (action.type) {
    case GroupActionEnum.SET_DATA_GROUP: {
      return {
        ...state,
        dataGroup: action.payload,
      };
    }
    case GroupActionEnum.RESET: {
      return initState;
    }
    default: {
      return state;
    }
  }
}
