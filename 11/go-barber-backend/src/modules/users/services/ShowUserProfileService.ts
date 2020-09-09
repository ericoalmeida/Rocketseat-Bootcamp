import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Users from '@users/infra/typeorm/entities/Users';
import IUsersRepository from '@users/repositories/IUsersRepository';
import AppErrors from '@shared/errors/AppErrors';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Users> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppErrors('User does not exists');
    }

    return user;
  }
}

export default ShowUserProfileService;
