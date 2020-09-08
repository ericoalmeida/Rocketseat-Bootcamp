import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from './Pages/Main';
import Box from './Pages/Box';

const Routes = createAppContainer(
  createSwitchNavigator({
    Main,
    Box,
  }),
);

export default Routes;
