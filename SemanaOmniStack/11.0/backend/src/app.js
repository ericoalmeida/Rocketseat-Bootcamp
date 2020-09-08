import express from 'express';
import cors from 'cors';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptions();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptions() {}
}

export default new App().server;
