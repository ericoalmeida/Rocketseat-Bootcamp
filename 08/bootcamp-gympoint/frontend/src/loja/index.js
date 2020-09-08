import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import criarLoja from './criarLoja';
import persistirReducers from './persistirReducers';
import reducerPrincipal from './modulos/reducerPrincipal';
import sagaPrincipal from './modulos/sagaPrincipal';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middleware = [sagaMiddleware];

const loja = criarLoja(persistirReducers(reducerPrincipal), middleware);
const persistor = persistStore(loja);

sagaMiddleware.run(sagaPrincipal);

export { loja, persistor };
