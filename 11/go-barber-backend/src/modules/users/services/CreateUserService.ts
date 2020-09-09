import { injectable, inject } from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@users/repositories/IUsersRepository';
import AppErrors from '@shared/errors/AppErrors';
import IHashProvider from '@users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/Providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Users> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppErrors('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers');

    return user;
  }
}

export default CreateUserService;
