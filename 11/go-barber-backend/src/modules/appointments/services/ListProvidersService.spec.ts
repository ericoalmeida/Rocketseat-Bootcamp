import faker from 'faker';

import ListProvidersService from '@appointments/services/ListProvidersService';
import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/Providers/CacheProvider/fakes/FakeCacheProvider';

let listProvidersService: ListProvidersService;
let fakeUsersrepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersrepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersService = new ListProvidersService(
      fakeUsersrepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all providers', async () => {
    const userOne = await fakeUsersrepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const userTwo = await fakeUsersrepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const loggedUser = await fakeUsersrepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo]);
  });

  it('should be able to list all providers with cache', async () => {
    const userOne = await fakeUsersrepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const userTwo = await fakeUsersrepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const loggedUser = await fakeUsersrepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toHaveLength(2);
  });
});
