import { injectable, inject } from 'tsyringe';

import AppErrors from '@shared/errors/AppErrors';
import IUsersRepository from '@users/repositories/IUsersRepository';
import IHashProvider from '@users/providers/HashProvider/models/IHashProvider';
import Users from '@users/infra/typeorm/entities/Users';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<Users> {
    const { user_id, name, email, oldPassword, password } = data;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppErrors('User not found');
    }

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists && userExists.id !== user.id) {
      throw new AppErrors('User already exists');
    }

    user.name = name;
    user.email = email;

    if (password && !oldPassword) {
      throw new AppErrors('Old password is required');
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compare(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppErrors('oldPassword does not match');
      }

      user.password = await this.hashProvider.generate(password);
    }

    const updatedUser = await this.usersRepository.update(user);

    return updatedUser;
  }
}

export default UpdateUserProfileService;
