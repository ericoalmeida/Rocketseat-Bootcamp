import IParseMailTemplateDTO from '@shared/container/Providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
