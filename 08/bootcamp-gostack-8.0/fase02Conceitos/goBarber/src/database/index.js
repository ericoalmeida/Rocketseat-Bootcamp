import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';
import UsuarioModel from '../app/models/Usuario';
import ArquivoModel from '../app/models/Arquivo';
import AgendamentoModel from '../app/models/Agendamento';

const models = [UsuarioModel, ArquivoModel, AgendamentoModel];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(
        model =>
          model.associarCampo && model.associarCampo(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
