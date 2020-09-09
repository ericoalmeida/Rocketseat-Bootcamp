import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/Providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/Providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/container/Providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class EtherialMailProvider implements IMailProvider {
  private clientMail: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.clientMail = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const info = await this.clientMail.sendMail({
      from: {
        name: from?.name || 'Equipe goBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },

      to: { name: to.name, address: to.email },

      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

export default EtherialMailProvider;
