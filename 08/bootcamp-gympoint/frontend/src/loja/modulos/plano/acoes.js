export function carregarLista(pagina, limite, filtro) {
  return {
    type: '@plano/Carregar',
    payload: { pagina, limite, filtro },
  };
}

export function carregadoLista(lista) {
  return {
    type: '@plano/Carregado',
    payload: { lista },
  };
}

export function localizarPlano(acao, planoId) {
  return {
    type: '@plano/Localizar',
    payload: { acao, planoId },
  };
}

export function localizadoPlano(acao, plano) {
  return {
    type: '@plano/Localizado',
    payload: { acao, plano },
  };
}

export function cadastrarPlano(acao) {
  return {
    type: '@plano/Cadastrar',
    payload: { acao },
  };
}

export function limparEstado() {
  return {
    type: '@plano/LimparEstado',
  };
}

export function incluirPlano(data) {
  return {
    type: '@plano/Incluir',
    payload: { data },
  };
}

export function alterarPlano(data) {
  return {
    type: '@plano/Alterar',
    payload: { data },
  };
}

export function excluirPlano(planoId) {
  return {
    type: '@plano/Excluir',
    payload: { planoId },
  };
}

export function totalizarPlanos(pagina, limite, filtro) {
  return {
    type: '@plano/Totalizar',
    payload: { pagina, limite, filtro },
  };
}

export function totalizadoPlanos(total) {
  return {
    type: '@plano/Totalizado',
    payload: { total },
  };
}
