import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/servicos/api';

import {
  carregadoLista,
  totalizadoOrdemServico,
  localizadoOrdemServico,
  carregarLista,
  limparEstado,
} from './acoes';

export function* carregandoLista({ payload }) {
  try {
    const { pagina, limite, filtro, resolvido } = payload;

    const lista = yield call(api.get, '/ordemservico', {
      params: { pagina, limite, filtro, resolvido },
    });

    yield put(carregadoLista(lista.data));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente Novamente.');
  }
}

export function* totalizandoAlunos({ payload }) {
  try {
    const { pagina, limite, filtro, resolvido } = payload;

    const response = yield call(api.get, '/ordemservico/totalordemservico/', {
      params: { pagina, limite, filtro, resolvido },
    });

    const { total } = response.data;

    yield put(totalizadoOrdemServico(total));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export function* localizandoOrdemServico({ payload }) {
  try {
    const { acao, ordemServicoId } = payload;

    const response = yield call(api.get, `/ordemservico/${ordemServicoId}`);

    yield put(localizadoOrdemServico(acao, response.data));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export function* alterandoOrdemServico({ payload }) {
  try {
    const { id, retorno } = payload.dados;

    yield call(api.put, `/ordemservico/${id}/retorno`, {
      retorno,
    });

    toast.success('Enviado resposta com sucesso');

    yield put(limparEstado());
    yield put(carregarLista());
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export default all([
  takeLatest('@ordemservico/Carregar', carregandoLista),
  takeLatest('@ordemservico/Totalizar', totalizandoAlunos),
  takeLatest('@ordemservico/Localizar', localizandoOrdemServico),
  takeLatest('@ordemservico/Alterar', alterandoOrdemServico),
]);
