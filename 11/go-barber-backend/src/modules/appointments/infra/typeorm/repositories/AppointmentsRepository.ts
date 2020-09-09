import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointments>;

  constructor() {
    this.ormRepository = getRepository(Appointments);
  }
  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointments | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        provider_id,
      },
    });

    return findAppointment;
  }

  public async save(data: ICreateAppointmentDTO): Promise<Appointments> {
    const { provider_id, customer_id, date } = data;

    const appointment = this.ormRepository.create({
      provider_id,
      customer_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointments[]> {
    const { provider_id, month, year } = data;
    const parsedMonth = String(month).padStart(2, '0');

    const findOutAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => {
          return `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`;
        }),
      },
    });

    return findOutAppointments;
  }

  public async findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointments[]> {
    const { provider_id, day, month, year } = data;

    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const findOutAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName => {
          return `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`;
        }),
      },
      relations: ['customer'],
    });

    return findOutAppointments;
  }
}

export default AppointmentsRepository;
