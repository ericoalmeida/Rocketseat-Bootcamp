import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Email from '../../lib/Email';

class EmailCancelamento {
  get key() {
    return 'EmailCancelamento';
  }

  async handle({ data }) {
    const { agendamento } = data;

    await Email.enviarEmail({
      to: `${agendamento.provedor.nome} <${agendamento.provedor.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancelamento',
      context: {
        provider: agendamento.provedor.nome,
        usuario: agendamento.usuario.nome,
        data: format(
          parseISO(agendamento.data),
          "dd 'de' MMMM 'de' yyyy', às' hh:mm'h' ",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new EmailCancelamento();
