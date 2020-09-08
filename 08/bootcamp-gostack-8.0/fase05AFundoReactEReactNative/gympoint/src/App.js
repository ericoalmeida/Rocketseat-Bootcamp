import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import '~/configuracoes/reactotron';

import Rotas from '~/rotas';
import historicoNavegacao from '~/servicos/historico';

import { loja, persistor } from '~/loja';

import EstiloGlobal from '~/estilos/global';

function App() {
  return (
    <Provider store={loja}>
      <PersistGate persistor={persistor}>
        <Router history={historicoNavegacao}>
          <Rotas />
          <EstiloGlobal />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
