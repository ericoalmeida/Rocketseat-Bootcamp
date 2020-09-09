import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProvidersController from '@appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailabilityController from '@appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@appointments/infra/http/controllers/ProviderMonthAvailabilityController';

import ensureAuthenticated from '@users/infra/http/middlewares/ensureAuthenticated';

const providersRoutes = Router();
const providersController = new ProvidersController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();
const providerDayAvailability = new ProviderDayAvailabilityController();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', providersController.index);

providersRoutes.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailability.index,
);

providersRoutes.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailability.index,
);

export default providersRoutes;
