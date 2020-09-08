export default function acaoAtual(acao) {
  let operacao = '';

  switch (acao) {
    case '@acao/Create': {
      operacao = 'Incluindo...';
      break;
    }

    case '@acao/Update': {
      operacao = 'Alterando...';
      break;
    }

    case '@acao/Delete': {
      operacao = 'Excluindo...';
      break;
    }

    default:
      break;
  }

  return operacao;
}
