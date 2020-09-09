import faker from 'faker';
import AppErrors from '@shared/errors/AppErrors';

import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/Providers/CacheProvider/fakes/FakeCacheProvider';

import CreateUserService from '@users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;

describe('Create Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able created new user', async () => {
    const user = await createUserService.execute({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able create user with duplicated email', async () => {
    const currentUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await createUserService.execute(currentUser);

    await expect(createUserService.execute(currentUser)).rejects.toBeInstanceOf(
      AppErrors,
    );
  });
});
