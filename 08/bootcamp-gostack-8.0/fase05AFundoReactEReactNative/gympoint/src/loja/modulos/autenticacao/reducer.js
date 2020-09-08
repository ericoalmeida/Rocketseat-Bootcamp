import { produce } from 'immer';

const EstadoInicial = {
  token: null,
  usuarioLogado: false,
  carregando: false,
};

export default function autenticacao(state = EstadoInicial, action) {
  return produce(state, rascunho => {
    switch (action.type) {
      case '@autenticacao/RequererAcesso': {
        rascunho.carregando = true;
        break;
      }

      case '@autenticacao/AcessoPermitido': {
        rascunho.token = action.payload.token;
        rascunho.usuarioLogado = true;
        rascunho.carregando = false;
        break;
      }

      case '@autenticacao/Falha': {
        rascunho.carregando = false;
        break;
      }

      case '@autenticacao/SairDoSistema': {
        rascunho.token = null;
        rascunho.usuarioLogado = false;
        break;
      }

      default:
    }
  });
}
