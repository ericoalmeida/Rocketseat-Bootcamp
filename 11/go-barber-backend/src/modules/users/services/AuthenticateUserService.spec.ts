import faker from 'faker';

import AppErrors from '@shared/errors/AppErrors';
import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@users/services/AuthenticateUserService';
import CreateUserService from '@users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;
let authUserService: AuthenticateUserService;

describe('Authenticate Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able authenticate user', async () => {
    const currentUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await fakeUsersRepository.create(currentUser);

    const userAuthenticated = await authUserService.execute({
      email: currentUser.email,
      password: currentUser.password,
    });

    expect(userAuthenticated).toHaveProperty('token');
  });

  it('should not be able authenticate user does not exists', async () => {
    await expect(
      authUserService.execute({
        email: faker.internet.email(),
        password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able autenticate user with wrong password', async () => {
    const currentUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await fakeUsersRepository.create(currentUser);

    await expect(
      authUserService.execute({
        email: currentUser.email,
        password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
