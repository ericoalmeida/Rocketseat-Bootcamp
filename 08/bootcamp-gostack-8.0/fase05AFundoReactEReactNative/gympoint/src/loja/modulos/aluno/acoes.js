export function carregarLista(pagina, limite, filtro) {
  return {
    type: '@aluno/Carregar',
    payload: { pagina, limite, filtro },
  };
}

export function carregadoLista(lista) {
  return {
    type: '@aluno/Carregado',
    payload: { lista },
  };
}

export function localizarAluno(acao, alunoId) {
  return {
    type: '@aluno/Localizar',
    payload: { acao, alunoId },
  };
}

export function localizadoAluno(acao, aluno) {
  return {
    type: '@aluno/Localizado',
    payload: { acao, aluno },
  };
}

export function cadastrarAluno(acao) {
  return {
    type: '@aluno/Cadastrar',
    payload: { acao },
  };
}

export function limparEstado() {
  return {
    type: '@aluno/LimparEstado',
  };
}

export function incluirAluno(data) {
  return {
    type: '@aluno/Incluir',
    payload: { data },
  };
}

export function alterarAluno(data) {
  return {
    type: '@aluno/Alterar',
    payload: { data },
  };
}

export function excluirAluno(alunoId) {
  return {
    type: '@aluno/Excluir',
    payload: { alunoId },
  };
}

export function totalizarAlunos(pagina, limite, filtro) {
  return {
    type: '@aluno/Totalizar',
    payload: { pagina, limite, filtro },
  };
}

export function totalizadoAlunos(total) {
  return {
    type: '@aluno/Totalizado',
    payload: { total },
  };
}
