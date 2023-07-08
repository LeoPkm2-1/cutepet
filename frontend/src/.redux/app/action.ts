import Enum from "../../utils/enum";
import { typedAction } from "../typed-action";

export const AppActionEnum = {
  SET_APP_BAR_TITLE: "app/SET_APP_BAR_TITLE",
  SET_BREADCRUMBS: "app/SET_BREADCRUMBS",
  ADD_BREADCRUMB: "app/ADD_BREADCRUMB",
  RESET: "RESET",
} as const;

export type AppActionEnum = Enum<typeof AppActionEnum>;

function setAppBarTitle(title: string) {
  return typedAction(AppActionEnum.SET_APP_BAR_TITLE, { title });
}

export type AppActionTypes =
  | ReturnType<typeof setAppBarTitle>
  | { type: typeof AppActionEnum.RESET };

export default { setAppBarTitle };
