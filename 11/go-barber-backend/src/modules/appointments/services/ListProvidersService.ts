import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/Providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Users from '@modules/users/infra/typeorm/entities/Users';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Users[]> {
    let users = await this.cacheProvider.recover<Users[]>(
      `providers:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        exceptUser_id: user_id,
      });
    }

    await this.cacheProvider.save(`providers:${user_id}`, users);

    return users;
  }
}

export default ListProvidersService;
