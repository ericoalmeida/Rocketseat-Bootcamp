import * as Yup from 'yup';
import { isBefore, parseISO, startOfHour, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import AppointmentModel from '../models/Appointment';
import UserModel from '../models/User';
import FileModel from '../models/File';
import Notification from '../schemas/Notification';

import Queue from '../lib/Queue';
import cancellationMailJob from '../jobs/cancellationMail';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointment = await AppointmentModel.findAll({
      where: { user_id: req.userId, canceled_at: null },
      attributes: ['id', 'date', 'cancelable', 'past'],
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: UserModel,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: FileModel,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({});

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check is a provider
     */
    const isProvider = await UserModel.findOne({
      where: { id: req.body.provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(400)
        .json({ error: 'You can only create appointment with providers' });
    }

    /**
     * Check self create appointment
     */
    if (req.userId === req.body.provider_id) {
      return res
        .status(401)
        .json({ error: 'Not permitted create appointment for yourself' });
    }

    /**
     * Check date are passed
     */
    const hourStart = startOfHour(parseISO(req.body.date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Passed dates are not permitted' });
    }

    /**
     * Check date availability
     */

    const isApointmentExists = await AppointmentModel.findOne({
      where: {
        provider_id: req.body.provider_id,
        date: hourStart,
        canceled_at: null,
      },
    });

    if (isApointmentExists) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    /**
     * Create appointment
     */

    const appointment = await AppointmentModel.create({
      user_id: req.userId,
      provider_id: req.body.provider_id,
      date: hourStart,
    });

    /**
     * Notify provider
     */
    const { name } = await UserModel.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' h:mm'h' ",
      {
        locale: pt,
      }
    );

    await Notification.create({
      content: `Novo agendamento de ${name} para ${formattedDate}`,
      user: req.body.provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await AppointmentModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          as: 'provider',
          attributes: ['name', 'mail'],
        },
        {
          model: UserModel,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (req.userId !== appointment.user_id) {
      return this.status(401).json({
        error: "You don't have permission to cancel this appointment",
      });
    }

    const hourLimitToCancel = subHours(appointment.date, 2);

    if (isBefore(hourLimitToCancel, new Date())) {
      return res
        .status(401)
        .json({ error: 'Deadline for cancellation has passed' });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    Queue.add(cancellationMailJob.key, { appointment });

    return res.json(appointment);
  }
}

export default new AppointmentController();
