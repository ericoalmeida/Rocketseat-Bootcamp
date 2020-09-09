import IMailTemplateProvider from '@shared/container/Providers/MailTemplateProvider/models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'template';
  }
}

export default FakeMailTemplateProvider;
