import { Router } from 'express';

import UsersController from './app/controllers/UsersController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/users', UsersController.store);

export default routes;
