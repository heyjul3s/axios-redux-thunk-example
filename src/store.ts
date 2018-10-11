import * as storage from 'localforage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import Reducers from './../src/reducers/index';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducers = persistReducer(persistConfig, Reducers);

export default () => {
  const store = createStore(persistedReducers, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { store, persistor };
};
