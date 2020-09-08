export function atualizarPerfil(data) {
  return {
    type: '@usuario/AtualizarPerfil',
    payload: { data },
  };
}

export function perfilAtualizado(perfil) {
  return {
    type: '@usuario/PerfilAtualizado',
    payload: { perfil },
  };
}

export function falha() {
  return {
    type: '@usuario/Falha',
  };
}
