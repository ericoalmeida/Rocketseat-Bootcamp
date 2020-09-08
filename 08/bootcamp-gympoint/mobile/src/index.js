import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import '~/configuracoes/reactotron';

import { loja, persistor } from '~/loja';

import App from '~/App';

export default function Index() {
  return (
    <Provider store={loja}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
