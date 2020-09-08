export function carregarLista(pagina, limite, filtro, resolvido) {
  return {
    type: '@ordemservico/Carregar',
    payload: { pagina, limite, filtro, resolvido },
  };
}

export function carregadoLista(lista) {
  return {
    type: '@ordemservico/Carregado',
    payload: { lista },
  };
}

export function totalizarOrdemServico(pagina, limite, filtro, resolvido) {
  return {
    type: '@ordemservico/Totalizar',
    payload: { pagina, limite, filtro, resolvido },
  };
}

export function totalizadoOrdemServico(total) {
  return {
    type: '@ordemservico/Totalizado',
    payload: { total },
  };
}

export function localizarOrdemServico(acao, ordemServicoId) {
  return {
    type: '@ordemservico/Localizar',
    payload: { acao, ordemServicoId },
  };
}

export function localizadoOrdemServico(acao, ordemServico) {
  return {
    type: '@ordemservico/Localizado',
    payload: { acao, ordemServico },
  };
}

export function alterarOrdemServico(dados) {
  return {
    type: '@ordemservico/Alterar',
    payload: { dados },
  };
}

export function limparEstado() {
  return {
    type: '@ordemservico/LimparEstado',
  };
}
