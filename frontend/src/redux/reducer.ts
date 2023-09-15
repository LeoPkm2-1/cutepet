import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { userReducer } from "./user";
import { appReducer } from "./app";
import { groupsReducer } from "./groups";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  app: appReducer,
  group: groupsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
