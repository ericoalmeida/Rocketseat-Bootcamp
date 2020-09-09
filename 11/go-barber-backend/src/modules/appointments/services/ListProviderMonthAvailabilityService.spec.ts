import faker from 'faker';

import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailability from '@appointments/services/ListProviderMonthAvailabilityService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('should be able list availability dates from provider', async () => {
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

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 8, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 9, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 10, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 11, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 12, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 13, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 14, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 15, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 16, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 16, 17, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    await fakeAppointmentsRepository.save({
      date: new Date(2020, 5, 17, 8, 0, 0),
      provider_id: provider.id,
      customer_id: customer.id,
    });

    const availabilityDates = await listProviderMonthAvailability.execute({
      provider_id: provider.id,
      month: 6,
      year: 2020,
    });

    expect(availabilityDates).toEqual(
      expect.arrayContaining([
        { day: 15, available: true },
        { day: 16, available: false },
        { day: 17, available: true },
        { day: 18, available: true },
      ]),
    );
  });
});
