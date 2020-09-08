import { produce } from 'immer';

export const EstadoInicial = {
  aluno: null,
};

export default function aluno(state = EstadoInicial, action) {
  return produce(state, rascunho => {
    switch (action.type) {
      case '@autenticacao/AcessoPermitido': {
        rascunho.aluno = action.payload.aluno;
        break;
      }

      case '@autenticacao/SairDoSistema': {
        rascunho.aluno = null;
        break;
      }

      default:
    }
  });
}
