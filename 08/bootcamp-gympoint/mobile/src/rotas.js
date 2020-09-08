import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '~/paginas/login';

import Checkins from '~/paginas/Checkins';
import TipoOrdemServico from '~/paginas/TipoOrdemServico';
import OrdemServico from '~/paginas/OrdemServico';

import NovaOs from '~/paginas/OrdemServico/NovaOs';
import VisualizarOs from '~/paginas/OrdemServico/VisualizarOs';

export default (logado = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Acesso: createSwitchNavigator({ Login }),
        App: createBottomTabNavigator(
          { Checkins, OrdemServico },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4d64',
              inactiveTintColor: '#c1cad6',
              labelStyle: {
                fontSize: 14,
              },
              style: {
                borderTopColor: '#d9d9d9',
                borderTopWidth: 1,
                height: 60,
                backgroundColor: '#fff',
              },
            },
          }
        ),
        Os: createStackNavigator(
          { TipoOrdemServico, NovaOs, VisualizarOs },
          {
            headerLayoutPreset: 'center',
            headerBackTitleVisible: false,
            defaultNavigationOptions: {
              headerTransparent: true,
              headerTintColor: '#ee4d64',
              headerLeftContainerStyle: {
                marginLeft: 20,
              },
            },
          }
        ),
      },
      {
        initialRouteName: logado ? 'App' : 'Acesso',
      }
    )
  );
