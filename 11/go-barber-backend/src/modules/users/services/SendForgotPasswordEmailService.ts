import { inject, injectable } from 'tsyringe';
import { resolve } from 'path';

import AppErrors from '@shared/errors/AppErrors';
import IUsersRepository from '@users/repositories/IUsersRepository';
import IUserTokenRepository from '@users/repositories/IUserTokenRepository';
import IMailProvider from '@shared/container/Providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppErrors('User does not exists', 401);
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordMailTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[goBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordMailTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
