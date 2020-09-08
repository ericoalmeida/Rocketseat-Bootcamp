export function requererAcesso(email, senha) {
  return {
    type: '@autenticacao/RequererAcesso',
    payload: { email, senha },
  };
}

export function acessoPermitido(usuario, token) {
  return {
    type: '@autenticacao/AcessoPermitido',
    payload: { usuario, token },
  };
}

export function criarConta(nome, email, senha) {
  return {
    type: '@autenticacao/CriarConta',
    payload: { nome, email, senha },
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
