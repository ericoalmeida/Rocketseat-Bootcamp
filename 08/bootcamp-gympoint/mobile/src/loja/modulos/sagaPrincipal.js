import { all } from 'redux-saga/effects';

import autenticacao from './autenticacao/sagas';

export default function* sagaPrincipal() {
  return yield all([autenticacao]);
}
