import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Email from '../../lib/Email';

class EmailRetornoSolicitacao {
  get key() {
    return 'EmailRetornoSolicitacao';
  }

  async handle({ data: ordemServico }) {
    await Email.enviarEmail({
      to: `${ordemServico.aluno.nome} <${ordemServico.aluno.email}>`,
      subject: 'Retorno de solicitação',
      template: 'retorno',
      context: {
        aluno: ordemServico.aluno.nome,
        ordemServicoId: ordemServico.id,
        tipoOrdemServico: ordemServico.tipo_ordem.descricao,
        solicitacao: ordemServico.solicitacao,
        data: format(
          parseISO(ordemServico.createdAt),
          "dd 'de' MMMM 'de' yyyy', às' hh:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new EmailRetornoSolicitacao();
