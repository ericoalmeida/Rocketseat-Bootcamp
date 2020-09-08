import { produce } from 'immer';

const EstadoInicial = {
  perfil: null,
};

export default function usuario(state = EstadoInicial, action) {
  return produce(state, rascunho => {
    switch (action.type) {
      case '@autenticacao/AcessoPermitido': {
        rascunho.perfil = action.payload.usuario;
        break;
      }

      case '@usuario/PerfilAtualizado': {
        rascunho.perfil = action.payload.perfil;
        break;
      }

      case '@autenticacao/SairDoSistema': {
        rascunho.perfil = null;
        break;
      }

      default:
    }
  });
}
