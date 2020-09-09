import IMailProvider from '@shared/container/Providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/container/Providers/MailProvider/dtos/ISendMailDTO';

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
