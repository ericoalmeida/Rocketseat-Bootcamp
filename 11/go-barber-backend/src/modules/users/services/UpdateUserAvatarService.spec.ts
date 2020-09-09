import faker from 'faker';
import AppErrors from '@shared/errors/AppErrors';

import FakeUserRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/Providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '@users/services/UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('Update avatar user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able update user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatarUser.jpg',
    });

    expect(user.avatar).toBe('avatarUser.jpg');
  });

  it('should not be able update avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatarUser.jpg',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should be able delete old avatar befor update new avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatarUser.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'newAvatarUser.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatarUser.jpg');
    expect(user.avatar).toBe('newAvatarUser.jpg');
  });
});
