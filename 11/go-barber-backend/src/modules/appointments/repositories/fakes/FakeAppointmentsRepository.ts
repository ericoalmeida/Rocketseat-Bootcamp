import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayfromProviderDTO from '@appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointments[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointments | undefined> {
    const findAppointments = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointments;
  }

  public async save(data: ICreateAppointmentDTO): Promise<Appointments> {
    const { date, provider_id, customer_id } = data;
    const appointment = new Appointments();

    Object.assign(appointment, {
      id: uuid(),
      date,
      provider_id,
      customer_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointments[]> {
    const { provider_id, month, year } = data;

    const findOutAppointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return findOutAppointments;
  }

  public async findAllInDayFromProvider(
    data: IFindAllInDayfromProviderDTO,
  ): Promise<Appointments[]> {
    const { provider_id, day, month, year } = data;

    const findOutAppointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return findOutAppointments;
  }
}

export default AppointmentsRepository;
