import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';
import NavigationService from './services/navigation';

import colors from './styles/colors';

export default function App() {
  return (
    <>
      <Routes
        ref={navigatorRef => NavigationService.setNavigator(navigatorRef)}
      />
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />
    </>
  );
}
