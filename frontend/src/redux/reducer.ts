import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { userPersistConfig, userReducer } from './user';
import { appReducer } from './app';
import { groupsReducer } from './groups';
import { dataReducer } from './data';
import persistReducer from 'redux-persist/es/persistReducer';
import { friendReducer } from './friend';
import { notiReducer } from './noti';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: persistReducer(userPersistConfig, userReducer),
  app: appReducer,
  group: groupsReducer,
  data: dataReducer,
  friend: friendReducer,
  noti:notiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
