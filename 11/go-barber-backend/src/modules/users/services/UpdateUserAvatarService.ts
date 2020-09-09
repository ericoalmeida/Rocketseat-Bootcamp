import { inject, injectable } from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';
import AppErrors from '@shared/errors/AppErrors';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<Users> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppErrors('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
