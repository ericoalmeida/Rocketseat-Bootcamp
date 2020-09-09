import faker from 'faker';

import FakeAppointmentsRepository from '@appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/Providers/CacheProvider/fakes/FakeCacheProvider';

import ListProviderAppointmentsService from '@appointments/services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able list provider appointments on a specific day', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 14, 11, 0, 0).getTime();
    });

    const appontmentOne = await fakeAppointmentsRepository.save({
      customer_id: 'customer-id',
      provider_id: 'provider-id',
      date: new Date(2020, 5, 14, 12, 0, 0),
    });

    const appontmentTwo = await fakeAppointmentsRepository.save({
      customer_id: 'customer-id',
      provider_id: 'provider-id',
      date: new Date(2020, 5, 14, 13, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider-id',
      day: 14,
      month: 6,
      year: 2020,
    });

    expect(appointments).toEqual([appontmentOne, appontmentTwo]);
  });

  it('should be able list provider appointments on a specific day with cache', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 14, 11, 0, 0).getTime();
    });

    const appontmentOne = await fakeAppointmentsRepository.save({
      customer_id: 'customer-id',
      provider_id: 'provider-id',
      date: new Date(2020, 5, 14, 12, 0, 0),
    });

    const appontmentTwo = await fakeAppointmentsRepository.save({
      customer_id: 'customer-id',
      provider_id: 'provider-id',
      date: new Date(2020, 5, 14, 13, 0, 0),
    });

    await listProviderAppointmentsService.execute({
      provider_id: 'provider-id',
      day: 14,
      month: 6,
      year: 2020,
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider-id',
      day: 14,
      month: 6,
      year: 2020,
    });

    expect(appointments).toHaveLength(2);
  });
});
