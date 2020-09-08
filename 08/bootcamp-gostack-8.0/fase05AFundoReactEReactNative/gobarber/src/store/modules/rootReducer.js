import { combineReducers } from 'redux';

import auth from './auth/reducer';
import usuario from './usuario/reducer';

export default combineReducers({
  auth,
  usuario,
});
