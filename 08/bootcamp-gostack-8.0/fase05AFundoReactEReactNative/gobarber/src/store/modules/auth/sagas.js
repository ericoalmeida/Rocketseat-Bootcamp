import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { loginSuccess, loginFailure } from './actions';

export function* login({ payload }) {
  try {
    const { email, senha } = payload;

    const response = yield call(api.post, 'sessao', {
      email,
      senha,
    });

    const { token, usuario } = response.data;

    if (!usuario.provedor) {
      toast.error('Usuario nao é um prestador!');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token, usuario));

    history.push('/dashboard');
  } catch (error) {
    toast.error('Erro durante o login');

    yield put(loginFailure());
  }
}

export function* cadastrese({ payload }) {
  try {
    console.tron.log(payload);

    const { nome, email, senha } = payload;

    yield call(api.post, 'usuario', {
      nome,
      email,
      senha,
      provedor: true,
    });

    history.push('/');
  } catch (error) {
    toast.error(error);

    yield put(loginFailure());
  }
}

export function salvarToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function saindoSistema() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', salvarToken),
  takeLatest('@auth/LOGIN_REQUEST', login),
  takeLatest('@auth/CADASTRESE_REQUEST', cadastrese),
  takeLatest('@auth/SAIR', saindoSistema),
]);
