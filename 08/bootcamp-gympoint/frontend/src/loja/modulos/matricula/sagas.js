import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/servicos/api';
import historico from '~/servicos/historico';
import { formatPrice } from '~/util/format';

import {
  carregadoLista,
  localizadoMatricula,
  limpaEstado,
  totalizadoMatriculas,
} from './acoes';

export function* carregandoLista({ payload }) {
  try {
    const { pagina, limite, filtro } = payload;

    const response = yield call(api.get, 'matricula', {
      params: { pagina, limite, filtro },
    });

    yield put(carregadoLista(response.data));
  } catch (error) {
    toast.error('Não foi possivel conectar ao servidor!');
  }
}

export function* localizandoMatricula({ payload }) {
  try {
    const { acao, matriculaId } = payload;

    const response = yield call(api.get, `/matricula/${matriculaId}`);

    const matricula = {
      id: response.data.id,
      aluno_id: response.data.aluno.id,
      plano_id: response.data.plano.id,
      data_inicio: response.data.data_inicio,
      data_termino: response.data.data_termino,
      preco_total: formatPrice(response.data.preco_total),
    };

    yield put(localizadoMatricula(acao, matricula));

    historico.push('/cadmatricula');
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor');
  }
}

export function acessandoCadastro() {
  try {
    historico.push('/cadmatricula');
  } catch (error) {
    toast.error('Nao foi possivel conectar ao servidor. Tente novamente');
  }
}

export function* incluindoMatricula({ payload }) {
  try {
    const { aluno_id, plano_id, data_inicio } = payload.data;

    yield call(api.post, 'matricula', { aluno_id, plano_id, data_inicio });

    toast.success('Matrícula cadastrada com sucesso!');

    yield put(limpaEstado());

    historico.push('/matricula');
  } catch (error) {
    toast.error('Nao foi possível conectar ao servidor');
  }
}

export function* alterandoMatricula({ payload }) {
  try {
    const { id, aluno_id, plano_id, data_inicio } = payload.data;

    yield call(api.put, `matricula/${id}`, { aluno_id, plano_id, data_inicio });

    toast.success('Matricula atualizada com sucesso!');

    yield put(limpaEstado());

    historico.push('/matricula');
  } catch (error) {
    toast.error('Nao foi possível conectar ao servidor');
  }
}

export function* excluindoMatricula({ payload }) {
  try {
    const { matriculaId } = payload;

    if (window.confirm('Deseja excluir o registro selecionado?')) {
      yield call(api.delete, `matricula/${matriculaId}`);

      toast.success('Matricula removida com sucesso!');

      yield put(limpaEstado());

      historico.push('/matricula');
    }
  } catch (error) {
    toast.error('Nao foi possível conectar ao servidor');
  }
}

export function* totalizandoMatriculas({ payload }) {
  try {
    const { pagina, limite, filtro } = payload;

    const response = yield call(api.get, '/matricula/totalmatriculas/', {
      params: { pagina, limite, filtro },
    });

    const { total } = response.data;

    yield put(totalizadoMatriculas(total));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export default all([
  takeLatest('@matricula/Carregar', carregandoLista),
  takeLatest('@matricula/Localizar', localizandoMatricula),
  takeLatest('@matricula/Cadastrar', acessandoCadastro),
  takeLatest('@matricula/Incluir', incluindoMatricula),
  takeLatest('@matricula/Alterar', alterandoMatricula),
  takeLatest('@matricula/Excluir', excluindoMatricula),
  takeLatest('@matricula/Totalizar', totalizandoMatriculas),
]);
