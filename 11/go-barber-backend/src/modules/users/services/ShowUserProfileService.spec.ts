import faker from 'faker';

import ShowUserProfileService from '@users/services/ShowUserProfileService';
import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import AppErrors from '@shared/errors/AppErrors';

let showUserProfileService: ShowUserProfileService;
let fakeUserRepository: FakeUsersRepository;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showUserProfileService = new ShowUserProfileService(fakeUserRepository);
  });

  it('should be able show user profile', async () => {
    const currentUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const user = await fakeUserRepository.create(currentUser);

    const profile = await showUserProfileService.execute({ user_id: user.id });

    expect(profile.name).toBe(currentUser.name);
    expect(profile.email).toBe(currentUser.email);
  });

  it('should not be able show non-existing user profile', async () => {
    await expect(
      showUserProfileService.execute({ user_id: 'non-existing-user' }),
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
