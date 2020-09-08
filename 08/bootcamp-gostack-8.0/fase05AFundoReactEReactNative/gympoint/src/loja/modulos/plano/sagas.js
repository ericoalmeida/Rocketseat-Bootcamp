import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/servicos/api';
import historico from '~/servicos/historico';

import { formatPrice } from '~/util/format';

import {
  carregadoLista,
  limparEstado,
  localizadoPlano,
  totalizadoPlanos,
} from './acoes';

export function* carregandoLista({ payload }) {
  try {
    const { pagina, limite, filtro } = payload;

    const response = yield call(api.get, 'plano', {
      params: { pagina, limite, filtro },
    });

    const lista = response.data.map(item => ({
      ...item,
      preco_formatado: formatPrice(item.preco),
      preco_total_formatado: formatPrice(item.duracao * item.preco),
    }));

    yield put(carregadoLista(lista));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente Novamente.');
  }
}

export function* localizandoPlano({ payload }) {
  try {
    const { acao, planoId } = payload;

    const response = yield call(api.get, `plano/${planoId}`);

    yield put(localizadoPlano(acao, response.data));

    historico.push('/cadplanos');
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export function acessandoCadastro() {
  try {
    historico.push('/cadplanos');
  } catch (error) {
    toast.error('Não foi possivel conectar ao servidor. Tente novamente.');
  }
}

export function* incluindoPlano({ payload }) {
  try {
    const { titulo, duracao, preco } = payload.data;

    yield call(api.post, 'plano', {
      titulo,
      duracao,
      preco,
    });

    toast.success(`Plano ${titulo} incluído com sucesso`);

    yield put(limparEstado());

    historico.push('planos');
  } catch (error) {
    toast.error('Não foi possivel conectar ao servidor. Tente novamente.');
  }
}

export function* atualizandoPlano({ payload }) {
  try {
    const { id, titulo, duracao, preco } = payload.data;

    yield call(api.put, `plano/${id}`, {
      titulo,
      duracao,
      preco,
    });

    toast.success(`Plano atualizado com sucesso`);

    yield put(limparEstado());

    historico.push('/planos');
  } catch (error) {
    toast.error('Nao foi possível conectar ao servidor. Tente novamente');
  }
}

export function* excluindoPlano({ payload }) {
  try {
    const { planoId } = payload;

    if (window.confirm('Deseja excluir o registro selecionado?')) {
      yield call(api.delete, `plano/${planoId}`);

      toast.success(`Plano excluído com sucesso`);

      yield put(limparEstado());

      historico.push('/planos');
    }
  } catch (error) {
    toast.error('Nao foi possível conectar ao servidor. Tente novamente');
  }
}

export function* totalizandoPlanos({ payload }) {
  try {
    const { pagina, limite, filtro } = payload;

    const response = yield call(api.get, '/plano/totalplanos/', {
      params: { pagina, limite, filtro },
    });

    const { total } = response.data;

    yield put(totalizadoPlanos(total));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export default all([
  takeLatest('@plano/Carregar', carregandoLista),
  takeLatest('@plano/Localizar', localizandoPlano),
  takeLatest('@plano/Cadastrar', acessandoCadastro),
  takeLatest('@plano/Incluir', incluindoPlano),
  takeLatest('@plano/Alterar', atualizandoPlano),
  takeLatest('@plano/Excluir', excluindoPlano),
  takeLatest('@plano/Totalizar', totalizandoPlanos),
]);
