import {
  startOfDay,
  endOfDay,
  setSeconds,
  setMinutes,
  setHours,
  format,
  isAfter,
} from 'date-fns';

import { Op } from 'sequelize';

import AgendamentoModel from '../models/Agendamento';

class DisponivelController {
  async index(req, res) {
    const { data } = req.query;

    if (!data) {
      return res.status(400).json({ erro: 'Data informada é inválida' });
    }

    const dataPesquisa = Number(data);

    const agendamentos = await AgendamentoModel.findAll({
      where: {
        provedor_id: req.params.id,
        datacancelamento: null,
        data: {
          [Op.between]: [startOfDay(dataPesquisa), endOfDay(dataPesquisa)],
        },
      },
    });

    const cronograma = [
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    const horariosDisponiveis = cronograma.map(time => {
      const [hora, minuto] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(dataPesquisa, hora), minuto),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        disponivel:
          isAfter(value, new Date()) &&
          !agendamentos.find(a => format(a.data, 'HH:mm') === time),
      };
    });

    return res.json(horariosDisponiveis);
  }
}

export default new DisponivelController();
