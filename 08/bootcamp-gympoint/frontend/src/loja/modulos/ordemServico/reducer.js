import { produce } from 'immer';

const EstadoInicial = {
  carregando: false,
  acao: null,
  lista: [],
  ordemServico: null,
  totalRegistros: 0,
};

export default function ordemServico(state = EstadoInicial, action) {
  return produce(state, rascunho => {
    switch (action.type) {
      case '@ordemservico/Carregar': {
        rascunho.carregando = true;
        break;
      }

      case '@ordemservico/Carregado': {
        rascunho.lista = action.payload.lista;
        rascunho.carregando = false;
        break;
      }

      case '@ordemservico/Totalizado': {
        rascunho.totalRegistros = action.payload.total;
        break;
      }

      case '@ordemservico/Localizado': {
        rascunho.acao = action.payload.acao;
        rascunho.ordemServico = action.payload.ordemServico;
        break;
      }

      case '@ordemservico/LimparEstado': {
        rascunho.acao = null;
        rascunho.ordemServico = null;
        break;
      }

      case '@autenticacao/SairDoSistema': {
        rascunho.lista = [];
        break;
      }

      default:
    }
  });
}
