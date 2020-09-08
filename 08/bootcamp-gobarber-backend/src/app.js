import 'dotenv/config';

import express from 'express';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';
import sentrySettings from './settings/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    this.sentryInit();
    this.middlewares();
    this.routes();
    this.execptions();
  }

  sentryInit() {
    Sentry.init(sentrySettings);
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  execptions() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server errors' });
    });
  }
}

export default new App().server;
