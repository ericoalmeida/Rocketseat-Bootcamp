import faker from 'faker';

import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailability from '@appointments/services/ListProviderDayAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to show hours availability on a day', async () => {
    const provider = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const customer = await fakeUsersRepository.create({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 22, 11, 0, 0).getTime();
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 22, 14, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 22, 15, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    const availabilityHours = await listProviderDayAvailability.execute({
      provider_id: provider.id,
      day: 22,
      month: 6,
      year: 2020,
    });

    expect(availabilityHours).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
