import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import UserModel from '../app/models/User';
import FileModel from '../app/models/File';
import AppointmentModel from '../app/models/Appointment';

import databaseSettings from '../settings/database';

const models = [UserModel, FileModel, AppointmentModel];

class Database {
  constructor() {
    this.postgresInit();
    this.mongoInit();
  }

  postgresInit() {
    this.connection = new Sequelize(databaseSettings);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongoInit() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
