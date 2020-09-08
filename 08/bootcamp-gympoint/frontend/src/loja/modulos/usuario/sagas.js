import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/servicos/api';
import historico from '~/servicos/historico';

import { perfilAtualizado, falha } from './acoes';

export function* atualizandoPerfil({ payload }) {
  try {
    const { nome, email, ...camposRestantes } = payload.data;

    const perfil = {
      nome,
      email,
      ...(camposRestantes.senhaAntiga ? camposRestantes : {}),
    };

    const response = yield call(api.put, 'usuario', perfil);

    toast.success('Perfil atualizado com sucesso!');

    yield put(perfilAtualizado(response.data));

    setTimeout(() => {
      historico.push('/inicio');
    }, 3000);
  } catch (error) {
    toast.error('Falha durante a atualização dos dados.');

    yield put(falha());
  }
}

export default all([takeLatest('@usuario/AtualizarPerfil', atualizandoPerfil)]);
