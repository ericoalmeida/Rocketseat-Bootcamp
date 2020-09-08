import { produce } from 'immer';

const EstadoInicial = {
  alunoLogado: false,
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
        rascunho.alunoLogado = true;
        rascunho.carregando = false;
        break;
      }

      case '@autenticacao/Falha': {
        rascunho.alunoLogado = false;
        rascunho.carregando = false;
        break;
      }

      case '@autenticacao/SairDoSistema': {
        rascunho.alunoLogado = false;
        rascunho.carregando = false;
        break;
      }

      default:
    }
  });
}
