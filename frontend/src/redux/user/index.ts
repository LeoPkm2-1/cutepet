import storage from 'redux-persist/lib/storage';
export { default as userReducer } from "./reducer";
export { default as UserActions } from "./action";

export const userPersistConfig = {
    key: 'user',
    storage: storage,
  }
