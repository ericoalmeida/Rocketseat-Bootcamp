import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import EmailLib from '../lib/Email';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    const formattedDate = format(
      parseISO(appointment.date),
      "'dia' dd 'de' MMMM', às' h:mm'h'",
      { locale: pt }
    );

    await EmailLib.sendEmail({
      to: `${appointment.provider.name} <${appointment.provider.mail}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: formattedDate,
      },
    });
  }
}

export default new CancellationMail();
