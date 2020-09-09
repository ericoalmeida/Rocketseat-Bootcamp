import faker from 'faker';

import AppErrors from '@shared/errors/AppErrors';
import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@users/repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from '@users/services/ResetPasswordService';
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const newPassword = faker.internet.password();

    const generate = jest.spyOn(fakeHashProvider, 'generate');

    await resetPasswordService.execute({
      password: newPassword,
      token,
    });

    const userUpdated = await fakeUsersRepository.findById(user.id);

    expect(generate).toHaveBeenCalledWith(newPassword);
    expect(userUpdated?.password).toBe(newPassword);
  });

  it('should not be able reset password with non existing token', async () => {
    const newPassword = faker.internet.password();

    await expect(
      resetPasswordService.execute({
        password: newPassword,
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able reset password with non existing user', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'non-existing-user',
    );

    const newPassword = faker.internet.password();

    await expect(
      resetPasswordService.execute({
        password: newPassword,
        token,
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able reset password if passed mor than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const newPassword = faker.internet.password();

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: newPassword,
        token,
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
