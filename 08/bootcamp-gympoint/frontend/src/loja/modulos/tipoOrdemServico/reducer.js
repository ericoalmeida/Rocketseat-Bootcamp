import { produce } from 'immer';

const EstadoInicial = {
  tipoOrdemServico: null,
  lista: [],
  carregando: false,
  acao: null,
  totalRegistros: 0,
};

export default function tipoOrdemServico(state = EstadoInicial, action) {
  return produce(state, rascunho => {
    switch (action.type) {
      case '@tipoOrdemServico/Carregar': {
        rascunho.carregando = true;
        break;
      }

      case '@tipoOrdemServico/Carregado': {
        rascunho.lista = action.payload.lista;
        rascunho.carregando = false;
        break;
      }

      case '@tipoOrdemServico/Cadastrar': {
        rascunho.acao = action.payload.acao;
        rascunho.tipoOrdemServico = null;
        break;
      }

      case '@tipoOrdemServico/Localizado': {
        rascunho.acao = action.payload.acao;
        rascunho.tipoOrdemServico = action.payload.tipoOrdemServico;
        break;
      }

      case '@tipoOrdemServico/LimparEstado': {
        rascunho.tipoOrdemServico = null;
        rascunho.acao = null;
        break;
      }

      case '@tipoOrdemServico/Totalizado': {
        rascunho.totalRegistros = action.payload.total;
        break;
      }

      case '@autenticacao/SairDoSistema': {
        rascunho.tipoOrdemServico = null;
        rascunho.lista = [];
        break;
      }

      default:
    }
  });
}
