import { Router } from 'express';

import OngController from './Controllers/OngController';
import IncidentController from './Controllers/IncidentController';
import ProfileController from './Controllers/ProfileController';
import SessionController from './Controllers/SessionController';

const routes = new Router();

routes.get('/', (request, response) => response.json({ ready: true }));

routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

export default routes;
