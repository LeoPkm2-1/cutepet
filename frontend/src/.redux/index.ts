import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const isDev = process.env.REACT_APP_ENV === "development";

const middlewares: any[] = [thunk];
if (isDev) {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export type { RootState } from "./reducer";
