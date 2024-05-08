import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const isDev = process.env.REACT_APP_ENV === "development";

const middlewares: any[] = [thunk];
if (isDev) {
  middlewares.push(logger);
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'medio', 'user', "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
export type { RootState } from "./reducer";
