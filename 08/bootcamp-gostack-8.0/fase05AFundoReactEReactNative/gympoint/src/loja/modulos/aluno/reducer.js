import { produce } from 'immer';

export const EstadoInicial = {
  acao: null,
  carregando: false,
  aluno: null,
  lista: [],
  totalRegistros: 0,
};

export default function aluno(state = EstadoInicial, action) {
  return produce(state, rascunho => {
    switch (action.type) {
      case '@aluno/Carregar': {
        rascunho.carregando = true;
        break;
      }

      case '@aluno/Carregado': {
        rascunho.lista = action.payload.lista;
        rascunho.carregando = false;
        break;
      }

      case '@aluno/Cadastrar': {
        rascunho.acao = action.payload.acao;
        rascunho.aluno = null;
        break;
      }

      case '@aluno/LimparEstado': {
        rascunho.acao = null;
        rascunho.aluno = null;
        break;
      }

      case '@aluno/Localizado': {
        rascunho.acao = action.payload.acao;
        rascunho.aluno = action.payload.aluno;
        break;
      }

      case '@aluno/Totalizado': {
        rascunho.totalRegistros = action.payload.total;
        break;
      }

      case '@autenticacao/SairDoSistema': {
        rascunho.aluno = null;
        rascunho.lista = [];
        break;
      }

      default:
    }
  });
}
