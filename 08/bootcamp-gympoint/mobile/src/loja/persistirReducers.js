import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistirReducers = persistReducer(
    {
      key: 'gympointMobile',
      storage: AsyncStorage,
      whitelist: ['autenticacao', 'aluno', 'ordemServico'],
    },
    reducers
  );

  return persistirReducers;
};
