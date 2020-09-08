import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { falhaAtualizarPerfil, atualizarPerfilSuccess } from './actions';

export function* atualizarPerfil({ payload }) {
  try {
    const { nome, email, avatar_id, ...rest } = payload.data;

    const perfil = {
      nome,
      email,
      avatar_id,
      ...(rest.senhaAntiga ? rest : {}),
    };

    const response = yield call(api.put, 'usuario', perfil);

    toast.success('Perfil atualizado com sucesso!');

    yield put(atualizarPerfilSuccess(response.data));
  } catch (error) {
    toast.error('Falha na atualizacao do perfil');

    yield put(falhaAtualizarPerfil());
  }
}

export default all([
  takeLatest('@usuario/ATUALIZAR_PERFIL_REQUEST', atualizarPerfil),
]);
