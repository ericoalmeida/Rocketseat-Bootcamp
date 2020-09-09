import faker from 'faker';
import { uuid } from 'uuidv4';

import AppErrors from '@shared/errors/AppErrors';
import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserProfileService from '@users/services/UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfileService = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const newDataUser = {
      user_id: user.id,
      name: faker.name.firstName(),
      email: faker.internet.email(),
    };

    const updatedUser = await updateUserProfileService.execute(newDataUser);

    expect(updatedUser.name).toBe(newDataUser.name);
    expect(updatedUser.email).toBe(newDataUser.email);
  });

  it('should not be able to change profile from non existing user', async () => {
    await expect(
      updateUserProfileService.execute({
        user_id: uuid(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able to change email to another user email', async () => {
    const existingUser = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const user = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: faker.name.firstName(),
        email: existingUser.email,
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should be able change password', async () => {
    const user = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const newPassword = faker.internet.password();

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: user.name,
      email: user.email,
      oldPassword: user.password,
      password: newPassword,
    });

    expect(updatedUser.password).toBe(newPassword);
  });

  it('should not be able change password without oldPassword', async () => {
    const user = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const newPassword = faker.internet.password();

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        password: newPassword,
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able change password with wrong oldPassword', async () => {
    const user = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const newPassword = faker.internet.password();

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        oldPassword: 'wrong-old-password',
        password: newPassword,
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
