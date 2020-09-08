export function requererAcesso(alunoId) {
  return {
    type: '@autenticacao/RequererAcesso',
    payload: { alunoId },
  };
}

export function acessoPermitido(aluno) {
  return {
    type: '@autenticacao/AcessoPermitido',
    payload: { aluno },
  };
}

export function falhaAutenticacao() {
  return {
    type: '@autenticacao/Falha',
  };
}

export function sairDoSistema() {
  return {
    type: '@autenticacao/SairDoSistema',
  };
}
