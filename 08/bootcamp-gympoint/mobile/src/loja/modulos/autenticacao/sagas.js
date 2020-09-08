import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/servicos/api';

import { acessoPermitido, falhaAutenticacao } from './acoes';

export function* autenticarAcesso({ payload }) {
  const { alunoId } = payload;

  try {
    const response = yield call(api.get, `/aluno/acesso/${alunoId}`);

    const aluno = response.data;

    yield put(acessoPermitido(aluno));
  } catch (err) {
    Alert.alert('Aviso', `Nenhum aluno encontrado com ID ${alunoId}`);

    yield put(falhaAutenticacao());
  }
}

export function sairDoSistema() {
  // historico.push('/');
}

export default all([
  takeLatest('@autenticacao/RequererAcesso', autenticarAcesso),
  takeLatest('@autenticacao/SairDoSistema', sairDoSistema),
]);
