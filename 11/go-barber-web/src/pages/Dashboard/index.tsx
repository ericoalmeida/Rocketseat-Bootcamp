import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import DayPicker, { DayModifiers } from 'react-day-picker';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  customer: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBr,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBr });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() > 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => {
      return isAfter(parseISO(appointment.date), new Date());
    });
  }, [appointments]);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/schedule', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm', {
              locale: ptBr,
            }),
          };
        });

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="logo" />

          <Profile>
            <img
              src={
                user.avatar_url ||
                `https://api.adorable.io/avatars/44/${user.name}@adorable.io.png`
              }
              alt={user.name}
            />

            <div>
              <span>Bem Vindo</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horarios agendados</h1>

          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && (
            <>
              {nextAppointment && (
                <NextAppointment>
                  <strong>Agendamento à seguir</strong>

                  <div>
                    <img
                      src={
                        nextAppointment.customer.avatar_url ||
                        `https://api.adorable.io/avatars/55/${nextAppointment.customer.name}@adorable.png`
                      }
                      alt={nextAppointment.customer.name}
                    />

                    <strong>{nextAppointment.customer.name}</strong>
                    <span>
                      <FiClock />
                      {nextAppointment.hourFormatted}
                    </span>
                  </div>
                </NextAppointment>
              )}
            </>
          )}

          <Section>
            <strong>Manha</strong>

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={
                      appointment.customer.avatar_url ||
                      `https://api.adorable.io/avatars/55/${appointment.customer.name}@adorable.png`
                    }
                    alt={appointment.customer.name}
                  />

                  <strong>{appointment.customer.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={
                      appointment.customer.avatar_url ||
                      `https://api.adorable.io/avatars/55/${appointment.customer.name}@adorable.png`
                    }
                    alt={appointment.customer.name}
                  />

                  <strong>{appointment.customer.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            //Dias da semana
            weekdaysLong={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            //fromMonth: Mes de partida
            fromMonth={new Date()}
            //disabledDays: Desabilita dias da semana
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            //modifiers: passa uma classe de css
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            //months: passa os meses
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
