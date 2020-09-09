import { startOfHour, isBefore, getHours, format } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentRepository from '@appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/Providers/CacheProvider/models/ICacheProvider';

import AppErrors from '@shared/errors/AppErrors';

interface IRequest {
  provider_id: string;
  customer_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    customer_id,
    date,
  }: IRequest): Promise<Appointments> {
    const appointmentDate = startOfHour(date);

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppErrors(
        'You only can create appointment between 8am and 5pm',
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppErrors('You cannot create appointment an past dates');
    }

    if (customer_id === provider_id) {
      throw new AppErrors('You cannot create appointment for yourself');
    }

    const findAppointment = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointment) {
      throw new AppErrors('This hour is not available');
    }

    const appointment = await this.appointmentsRepository.save({
      provider_id,
      customer_id,
      date: appointmentDate,
    });

    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: appointment.provider_id,
      content: `Novo agendamento para o dia ${formattedDate}`,
    });

    const cacheKey = `provider-appointments:${provider_id}:${format(
      appointmentDate,
      'yyyy-M-d',
    )}`;

    await this.cacheProvider.invalidate(cacheKey);

    return appointment;
  }
}

export default CreateAppointmentService;
