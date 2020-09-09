import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppErrors from '@shared/errors/AppErrors';
import IUsersRepository from '@users/repositories/IUsersRepository';
import IUserTokenRepository from '@users/repositories/IUserTokenRepository';
import IHashProvider from '@users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest) {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppErrors('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppErrors('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const limitDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), limitDate)) {
      throw new AppErrors('Your token has expired');
    }

    user.password = await this.hashProvider.generate(password);

    await this.usersRepository.update(user);
  }
}

export default ResetPasswordService;
