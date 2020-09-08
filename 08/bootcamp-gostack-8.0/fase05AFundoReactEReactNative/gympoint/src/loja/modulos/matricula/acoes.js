export function carregarLista(pagina, limite, filtro) {
  return {
    type: '@matricula/Carregar',
    payload: { pagina, limite, filtro },
  };
}

export function carregadoLista(lista) {
  return {
    type: '@matricula/Carregado',
    payload: { lista },
  };
}

export function localizarMatricula(acao, matriculaId) {
  return {
    type: '@matricula/Localizar',
    payload: { acao, matriculaId },
  };
}

export function localizadoMatricula(acao, matricula) {
  return {
    type: '@matricula/Localizado',
    payload: { acao, matricula },
  };
}

export function cadastrarMatricula(acao) {
  return {
    type: '@matricula/Cadastrar',
    payload: { acao },
  };
}

export function limpaEstado() {
  return {
    type: '@matricula/LimpaEstado',
  };
}

export function incluirMatricula(data) {
  return {
    type: '@matricula/Incluir',
    payload: { data },
  };
}

export function alterarMatricula(data) {
  return {
    type: '@matricula/Alterar',
    payload: { data },
  };
}

export function excluirMatricula(matriculaId) {
  return {
    type: '@matricula/Excluir',
    payload: { matriculaId },
  };
}

export function totalizarMatriculas(pagina, limite, filtro) {
  return {
    type: '@matricula/Totalizar',
    payload: { pagina, limite, filtro },
  };
}

export function totalizadoMatriculas(total) {
  return {
    type: '@matricula/Totalizado',
    payload: { total },
  };
}
