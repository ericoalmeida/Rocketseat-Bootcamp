import { all } from 'redux-saga/effects';

import autenticacao from './autenticacao/sagas';
import usuario from './usuario/sagas';
import aluno from './aluno/sagas';
import plano from './plano/sagas';
import matricula from './matricula/sagas';
import tipoOrdemServico from './tipoOrdemServico/sagas';
import ordemServico from './ordemServico/sagas';

export default function* sagaPrincipal() {
  return yield all([
    autenticacao,
    usuario,
    aluno,
    plano,
    matricula,
    tipoOrdemServico,
    ordemServico,
  ]);
}
