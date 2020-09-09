import ISendMailDTO from '@shared/container/Providers/MailProvider/dtos/ISendMailDTO';

interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}

export default IMailProvider;
