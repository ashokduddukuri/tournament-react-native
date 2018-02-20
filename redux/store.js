import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/root.reducer';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
let persistor = persistStore(store);

// use it to clear app storage
// persistor.purge();

module.exports = {
  store,
  persistor
};