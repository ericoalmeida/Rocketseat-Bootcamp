import 'reflect-metadata';
import CreateAppointmentService from '@appointments/services/CreateAppointmentService';
import FakeNotificationsRepository from '@notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '@appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/Providers/CacheProvider/fakes/FakeCacheProvider';

import AppErrors from '@shared/errors/AppErrors';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 18, 13, 0, 0).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 6, 18, 15, 0, 0),
      customer_id: 'customer-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create a two appointments at the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 16, 13, 0, 0).getTime();
    });

    const appointmentDate = new Date(2020, 6, 16, 16, 0, 0);

    await createAppointmentService.execute({
      date: appointmentDate,
      customer_id: 'customer-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        customer_id: 'customer-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able create an appointment at past date ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 22, 11, 0, 0).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 6, 22, 9, 0, 0),
        customer_id: 'customer-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able create an appointment from yourself ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 22, 11, 0, 0).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 6, 22, 14, 0, 0),
        customer_id: 'sameUser-id',
        provider_id: 'sameUser-id',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able create before 8am hours ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 22, 11, 0, 0).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 6, 23, 7, 0, 0),
        customer_id: 'customer-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able create after 5pm hours ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 22, 11, 0, 0).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 6, 22, 18, 0, 0),
        customer_id: 'customer-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
