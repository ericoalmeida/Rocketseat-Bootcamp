import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistirReducers = persistReducer(
    {
      key: 'gympoint',
      storage,
      whitelist: [
        'autenticacao',
        'usuario',
        'aluno',
        'plano',
        'matricula',
        'tipoOrdemServico',
        'ordemServico',
      ],
    },
    reducers
  );

  return persistirReducers;
};
