export function carregarLista(pagina, limite, filtro) {
  return {
    type: '@tipoOrdemServico/Carregar',
    payload: { pagina, limite, filtro },
  };
}

export function carregadoLista(lista) {
  return {
    type: '@tipoOrdemServico/Carregado',
    payload: { lista },
  };
}

export function cadastrarTipoOrdemServico(acao) {
  return {
    type: '@tipoOrdemServico/Cadastrar',
    payload: { acao },
  };
}

export function localizarTipoOrdemServico(acao, tipoOrdemServicoId) {
  return {
    type: '@tipoOrdemServico/Localizar',
    payload: { acao, tipoOrdemServicoId },
  };
}

export function localizadoTipoOrdemServico(acao, tipoOrdemServico) {
  return {
    type: '@tipoOrdemServico/Localizado',
    payload: { acao, tipoOrdemServico },
  };
}

export function limparEstado() {
  return {
    type: '@tipoOrdemServico/LimparEstado',
  };
}

export function incluirTipoOrdemServico(data) {
  return {
    type: '@tipoOrdemServico/Incluir',
    payload: { data },
  };
}

export function alterarTipoOrdemServico(data) {
  return {
    type: '@tipoOrdemServico/Alterar',
    payload: { data },
  };
}

export function excluirTipoOrdemServico(tipoOrdemServicoId) {
  return {
    type: '@tipoOrdemServico/Excluir',
    payload: { tipoOrdemServicoId },
  };
}

export function totalizarTipoOrdemServico(pagina, limite, filtro) {
  return {
    type: '@tipoOrdemServico/Totalizar',
    payload: { pagina, limite, filtro },
  };
}

export function totalizadoTipoOrdemServico(total) {
  return {
    type: '@tipoOrdemServico/Totalizado',
    payload: { total },
  };
}
