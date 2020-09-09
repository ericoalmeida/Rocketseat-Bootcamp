import { container } from 'tsyringe';

import IMailProvider from '@shared/container/Providers/MailProvider/models/IMailProvider';
import EtherialMailProvider from '@shared/container/Providers/MailProvider/implementations/EtherialMailProvider';

const providers = {
  etherial: container.resolve(EtherialMailProvider),
};

container.registerInstance<IMailProvider>('MailProvider', providers.etherial);
