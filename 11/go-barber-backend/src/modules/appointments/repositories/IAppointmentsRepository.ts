import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '@appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@appointments/dtos/IFindAllInDayFromProviderDTO';

interface IAppointmentsRepository {
  save(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;

  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
