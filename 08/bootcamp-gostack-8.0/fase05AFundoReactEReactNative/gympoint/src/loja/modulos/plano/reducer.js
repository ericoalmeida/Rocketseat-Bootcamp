import { produce } from 'immer';

const EstadoInicial = {
  carregando: false,
  lista: [],
  plano: null,
  acao: null,
  totalRegistros: 0,
};

export default function plano(state = EstadoInicial, action) {
  return produce(state, rascunho => {
    switch (action.type) {
      case '@plano/Carregar': {
        rascunho.carregando = true;
        break;
      }

      case '@plano/Carregado': {
        rascunho.carregando = false;
        rascunho.lista = action.payload.lista;
        break;
      }

      case '@plano/Cadastrar': {
        rascunho.acao = action.payload.acao;
        rascunho.plano = null;
        break;
      }

      case '@plano/Localizado': {
        rascunho.plano = action.payload.plano;
        rascunho.acao = action.payload.acao;
        break;
      }

      case '@plano/LimparEstado': {
        rascunho.plano = null;
        rascunho.acao = null;
        break;
      }

      case '@plano/Totalizado': {
        rascunho.totalRegistros = action.payload.total;
        break;
      }

      case '@autenticacao/SairDoSistema': {
        rascunho.plano = null;
        rascunho.lista = [];
        break;
      }

      default:
    }
  });
}
