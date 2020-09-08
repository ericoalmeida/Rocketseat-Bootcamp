import React from 'react';
import {StatusBar, YellowBox} from 'react-native';

import Routes from './routes';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

const App = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <Routes />
  </>
);

export default App;
