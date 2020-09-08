import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

import AppointmentModel from '../models/Appointment';
import UserModel from '../models/User';

class ScheduleController {
  async index(req, res) {
    const userIsProvider = await UserModel.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!userIsProvider) {
      return res.status(401).json({ error: 'You are not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await AppointmentModel.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
