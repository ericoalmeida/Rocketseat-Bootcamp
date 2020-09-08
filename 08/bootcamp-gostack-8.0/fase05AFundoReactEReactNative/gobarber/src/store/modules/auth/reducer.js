import produce from 'immer';

const InitialState = {
  token: null,
  logado: false,
  loading: false,
};

export default function auth(state = InitialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/LOGIN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/LOGIN_SUCCESS': {
        draft.token = action.payload.token;
        draft.logado = true;
        draft.loading = false;
        break;
      }

      case '@auth/LOGIN_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@auth/SAIR': {
        draft.token = null;
        draft.logado = false;
        break;
      }

      default:
    }
  });
}
