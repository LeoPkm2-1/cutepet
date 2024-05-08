import Enum from "../../utils/enum";
import { typedAction } from "../typed-action";
import { Option } from "./reducer";

export const GroupActionEnum = {
  SET_DATA_GROUP: "group/SET_DATA_GROUP",
  RESET: "RESET",
} as const;

export type GroupActionEnum = Enum<typeof GroupActionEnum>;

function setDataGroup(dataGroups: Option[]) {
  return typedAction(GroupActionEnum.SET_DATA_GROUP, dataGroups);
}

export type GroupActionTypes =
  | ReturnType<typeof setDataGroup>
  | { type: typeof GroupActionEnum.RESET };

export default {setDataGroup};
