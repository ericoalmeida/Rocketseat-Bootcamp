import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentsController();
const providerAppointments = new ProviderAppointmentsController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.get('/schedule', providerAppointments.index);

appointmentsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);

export default appointmentsRoutes;
