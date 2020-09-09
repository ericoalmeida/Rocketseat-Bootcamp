import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { provider_id, month, year } = data;
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    //Retorna o numero de dias que o mes possui
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    //Monta um array, para cada dia do mes ser uma posição do array
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    //Retorna se o dia possui algum horário disponivel
    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
