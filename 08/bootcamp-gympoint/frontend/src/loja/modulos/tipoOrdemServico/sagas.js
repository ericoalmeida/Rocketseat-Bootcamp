import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/servicos/api';
import historico from '~/servicos/historico';

import {
  carregadoLista,
  localizadoTipoOrdemServico,
  limparEstado,
  totalizadoTipoOrdemServico,
} from './acoes';

export function* carregandoLista({ payload }) {
  try {
    const { pagina, limite, filtro } = payload;

    const lista = yield call(api.get, '/tipoordem', {
      params: { pagina, limite, filtro },
    });

    yield put(carregadoLista(lista.data));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente');
  }
}

export function acessandoCadastro() {
  try {
    historico.push('/cadtipoordemservico');
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente');
  }
}

export function* localizandoTipoOrdemServico({ payload }) {
  try {
    const { acao, tipoOrdemServicoId } = payload;

    const tipoOrdemServico = yield call(
      api.get,
      `/tipoordem/${tipoOrdemServicoId}`
    );

    yield put(localizadoTipoOrdemServico(acao, tipoOrdemServico.data));

    historico.push('/cadtipoordemservico');
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente Novamente.');
  }
}

export function* incluindoTipoOrdemServico({ payload }) {
  try {
    const { descricao } = payload.data;

    yield call(api.post, '/tipoordem', { descricao });

    toast.success('Tipo de Auxilio salvo com sucesso!!');

    yield put(limparEstado());

    historico.push('/tipoordemservico');
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente');
  }
}

export function* alterandoTipoOrdemServico({ payload }) {
  try {
    const { id, descricao } = payload.data;

    yield call(api.put, `/tipoordem/${id}`, {
      descricao,
    });

    toast.success('Tipo de Auxilio salvo com sucesso!!');

    yield put(limparEstado());

    historico.push('/tipoordemservico');
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export function* excluindoTipoOrdemServico({ payload }) {
  try {
    const { tipoOrdemServicoId } = payload;

    if (window.confirm('Deseja excluir o registro selecionado?')) {
      yield call(api.delete, `/tipoordem/${tipoOrdemServicoId}`);

      toast.success('Tipo de Auxilio excluído com sucesso!!');

      yield put(limparEstado());

      historico.push('/tipoordemservico');
    }
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export function* totalizandoTipoOrdemServico({ payload }) {
  try {
    const { pagina, limite, filtro } = payload;

    const response = yield call(api.get, '/tipoordem/totaltipoordem/', {
      params: { pagina, limite, filtro },
    });

    const { total } = response.data;

    yield put(totalizadoTipoOrdemServico(total));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export default all([
  takeLatest('@tipoOrdemServico/Carregar', carregandoLista),
  takeLatest('@tipoOrdemServico/Cadastrar', acessandoCadastro),
  takeLatest('@tipoOrdemServico/Localizar', localizandoTipoOrdemServico),
  takeLatest('@tipoOrdemServico/Incluir', incluindoTipoOrdemServico),
  takeLatest('@tipoOrdemServico/Alterar', alterandoTipoOrdemServico),
  takeLatest('@tipoOrdemServico/Excluir', excluindoTipoOrdemServico),
  takeLatest('@tipoOrdemServico/Totalizar', totalizandoTipoOrdemServico),
]);
