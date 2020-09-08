import { combineReducers } from 'redux';

import autenticacao from './autenticacao/reducer';
import aluno from './aluno/reducer';

export default combineReducers({
  autenticacao,
  aluno,
});
