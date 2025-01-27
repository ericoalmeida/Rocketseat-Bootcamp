import React from 'react';
import { StatusBar } from 'react-native';
import './config/reactotron';

import Routes from './routes';

function App() {
  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor='#7159c1' />
    </>
  );
}

export default App;
