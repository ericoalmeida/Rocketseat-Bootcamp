import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';

import api from '~/services/api';

const range = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
  const [data, setData] = useState(new Date());
  const [cronograma, setCronograma] = useState([]);

  const dataFormatada = useMemo(
    () => format(data, "dd 'de' MMMM", { locale: pt }),
    [data]
  );

  useEffect(() => {
    async function carregarCronograma() {
      const response = await api.get('/cronograma', {
        params: { data },
      });

      console.tron.log(response.data);

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const dataCronog = range.map(hora => {
        const checarData = setSeconds(setMinutes(setHours(data, hora), 0), 0);
        const compareDate = utcToZonedTime(checarData, timezone);

        return {
          time: `${hora}00h`,
          passou: isBefore(compareDate, new Date()),
          agendamento: response.data.find(a =>
            isEqual(parseISO(a.data), compareDate)
          ),
        };
      });

      console.tron.log(dataCronog);

      setCronograma(dataCronog);
    }

    carregarCronograma();
  }, [data]);

  function dataAnterior() {
    setData(subDays(data, 1));
  }

  function dataProxima() {
    setData(addDays(data, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={dataAnterior}>
          <MdChevronLeft size={36} color="#fff" />
        </button>

        <strong>{dataFormatada}</strong>

        <button type="button" onClick={dataProxima}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {cronograma.map(horaAg => (
          <Time
            key={horaAg.time}
            passou={horaAg.passou}
            disponivel={!horaAg.agendamento}
          >
            <strong>{horaAg.time}</strong>
            <span>
              {horaAg.agendamento
                ? horaAg.agendamento.usuario.nome
                : 'Em Aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
