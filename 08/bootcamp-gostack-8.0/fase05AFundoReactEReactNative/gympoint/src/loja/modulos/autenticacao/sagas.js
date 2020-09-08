import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/servicos/api';
import historico from '~/servicos/historico';

import { acessoPermitido, falhaAutenticacao } from './acoes';

export function* autenticarAcesso({ payload }) {
  try {
    const { email, senha } = payload;

    const response = yield call(api.post, 'sessao', {
      email,
      senha,
    });

    const { usuario, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(acessoPermitido(usuario, token));

    historico.push('/inicio');
  } catch (err) {
    toast.error('Erro durante a autenticação. Verifique seus dados.');

    yield put(falhaAutenticacao());
  }
}

export function* criandoConta({ payload }) {
  try {
    const { nome, email, senha } = payload;

    yield call(api.post, 'usuario', {
      nome,
      email,
      senha,
    });

    historico.push('/');
  } catch (err) {
    toast.error('Erro durante a criação da conta. Verifique seus dados.');
  }
}

export function salvarTokenAutorizacao({ payload }) {
  if (!payload) return;

  const { token } = payload.autenticacao;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function sairDoSistema() {
  historico.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', salvarTokenAutorizacao),

  takeLatest('@autenticacao/RequererAcesso', autenticarAcesso),
  takeLatest('@autenticacao/CriarConta', criandoConta),
  takeLatest('@autenticacao/SairDoSistema', sairDoSistema),
]);
