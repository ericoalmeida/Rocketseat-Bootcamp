import { combineReducers } from 'redux';

import autenticacao from './autenticacao/reducer';
import usuario from './usuario/reducer';
import aluno from './aluno/reducer';
import plano from './plano/reducer';
import matricula from './matricula/reducer';
import tipoOrdemServico from './tipoOrdemServico/reducer';
import ordemServico from './ordemServico/reducer';

export default combineReducers({
  autenticacao,
  usuario,
  aluno,
  plano,
  matricula,
  tipoOrdemServico,
  ordemServico,
});
