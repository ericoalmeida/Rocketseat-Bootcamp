import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'goBarber',
      storage,
      whitelist: ['auth', 'usuario'],
    },
    reducers
  );

  return persistedReducer;
};
