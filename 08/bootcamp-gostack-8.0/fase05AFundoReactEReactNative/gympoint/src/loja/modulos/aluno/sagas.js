import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import historico from '~/servicos/historico';
import api from '~/servicos/api';

import {
  carregadoLista,
  limparEstado,
  localizadoAluno,
  totalizadoAlunos,
} from './acoes';

export function* carregandoLista({ payload }) {
  try {
    const { pagina, limite, filtro } = payload;

    const response = yield call(api.get, '/aluno', {
      params: { pagina, limite, filtro },
    });

    yield put(carregadoLista(response.data));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor');
  }
}

export function acessandoCadastro() {
  try {
    historico.push('/cadalunos');
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente');
  }
}

export function* localizandoAluno({ payload }) {
  try {
    const { acao, alunoId } = payload;

    const response = yield call(api.get, `/aluno/${alunoId}`);

    yield put(localizadoAluno(acao, response.data));

    historico.push('/cadalunos');
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export function* incluindoAluno({ payload }) {
  try {
    const { nome, email, idade, peso, altura } = payload.data;

    yield call(api.post, 'aluno', { nome, email, idade, peso, altura });

    toast.success(`Aluno incluído com sucesso!`);

    yield put(limparEstado());

    historico.push('/alunos');
  } catch (err) {
    toast.error('Não foi possivel conectar ao servidor. Tente novamente');
  }
}

export function* atualizandoAluno({ payload }) {
  try {
    const { id, nome, email, idade, peso, altura } = payload.data;

    yield call(api.put, `aluno/${id}`, { nome, email, idade, peso, altura });

    toast.success('Aluno alterados com sucesso!');

    yield put(limparEstado());

    historico.push('/alunos');
  } catch (err) {
    toast.error('Não foi possivel conectar ao servidor. Tente novamente');
  }
}

export function* excluindoAluno({ payload }) {
  try {
    const { alunoId } = payload;

    if (window.confirm('Deseja excluir o registro selecionado?')) {
      yield call(api.delete, `aluno/${alunoId}`);

      toast.success('Aluno removido com sucesso!');

      yield put(limparEstado());

      historico.push('/alunos');
    }
  } catch (err) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export function* totalizandoAlunos({ payload }) {
  try {
    const { pagina, limite, filtro } = payload;

    const response = yield call(api.get, '/aluno/totalalunos/', {
      params: { pagina, limite, filtro },
    });

    const { total } = response.data;

    yield put(totalizadoAlunos(total));
  } catch (error) {
    toast.error('Não foi possível conectar ao servidor. Tente novamente.');
  }
}

export default all([
  takeLatest('@aluno/Carregar', carregandoLista),
  takeLatest('@aluno/Cadastrar', acessandoCadastro),
  takeLatest('@aluno/Localizar', localizandoAluno),
  takeLatest('@aluno/Incluir', incluindoAluno),
  takeLatest('@aluno/Alterar', atualizandoAluno),
  takeLatest('@aluno/Excluir', excluindoAluno),
  takeLatest('@aluno/Totalizar', totalizandoAlunos),
]);
