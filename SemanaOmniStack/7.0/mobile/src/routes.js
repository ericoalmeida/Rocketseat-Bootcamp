import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Image, StyleSheet} from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';

export default createAppContainer(
  createStackNavigator(
    {
      Feed,
      New,
    },
    {
      defaultNavigationOptions: {
        headerTitle: () => <Image style={styles.imageLogo} source={logo} />,
        headerBackTitle: null,
        headerTintColor: '#000',
      },
      mode: 'modal',
    },
  ),
);

const styles = StyleSheet.create({
  imageLogo: {
    marginHorizontal: 20,
  },
});
