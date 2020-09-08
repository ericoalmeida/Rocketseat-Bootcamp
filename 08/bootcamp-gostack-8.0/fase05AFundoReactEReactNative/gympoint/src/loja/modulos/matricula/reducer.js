import { produce } from 'immer';

const EstadoInicial = {
  carregando: false,
  lista: [],
  matricula: null,
  acao: null,
  totalRegistros: 0,
};

export default function matricula(state = EstadoInicial, action) {
  return produce(state, rascunho => {
    switch (action.type) {
      case '@matricula/Localizado': {
        rascunho.matricula = action.payload.matricula;
        rascunho.acao = action.payload.acao;
        break;
      }

      case '@matricula/LimpaEstado': {
        rascunho.matricula = null;
        rascunho.acao = null;
        break;
      }

      case '@matricula/Cadastrar': {
        rascunho.acao = action.payload.acao;
        rascunho.matricula = null;
        break;
      }

      case '@matricula/Carregar': {
        rascunho.carregando = true;
        break;
      }

      case '@matricula/Carregado': {
        rascunho.lista = action.payload.lista;
        rascunho.carregando = false;
        break;
      }

      case '@matricula/Totalizado': {
        rascunho.totalRegistros = action.payload.total;
        break;
      }

      case '@autenticacao/SairDoSistema': {
        rascunho.matricula = null;
        rascunho.lista = [];
        break;
      }

      default:
    }
  });
}
