import produce from 'immer';

const InitialState = {
  perfil: null,
};

export default function usuario(state = InitialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/LOGIN_SUCCESS': {
        draft.perfil = action.payload.usuario;
        break;
      }

      case '@usuario/ATUALIZAR_PERFIL_SUCESSO': {
        draft.perfil = action.payload.perfil;
        break;
      }

      case '@auth/SAIR': {
        draft.perfil = null;
        break;
      }

      default:
    }
  });
}
