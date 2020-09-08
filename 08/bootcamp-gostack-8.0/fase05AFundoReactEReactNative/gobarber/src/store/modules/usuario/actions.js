export function atualizarPerfilRequest(data) {
  return {
    type: '@usuario/ATUALIZAR_PERFIL_REQUEST',
    payload: { data },
  };
}

export function atualizarPerfilSuccess(perfil) {
  return {
    type: '@usuario/ATUALIZAR_PERFIL_SUCESSO',
    payload: { perfil },
  };
}

export function falhaAtualizarPerfil() {
  return {
    type: '@usuario/FALHA_ATUALIZAR_PERFIL',
  };
}
