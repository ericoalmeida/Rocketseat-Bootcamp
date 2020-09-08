export function loginRquest(email, senha) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { email, senha },
  };
}

export function loginSuccess(token, usuario) {
  return {
    type: '@auth/LOGIN_SUCCESS',
    payload: { token, usuario },
  };
}

export function loginFailure() {
  return {
    type: '@auth/LOGIN_FAILURE',
  };
}

export function cadastreseRequest(nome, email, senha) {
  return {
    type: '@auth/CADASTRESE_REQUEST',
    payload: { nome, email, senha },
  };
}

export function sairSistema() {
  return {
    type: '@auth/SAIR',
  };
}
