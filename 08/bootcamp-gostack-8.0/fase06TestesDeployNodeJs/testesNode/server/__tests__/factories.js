import faker from 'faker';
import { factory } from 'factory-girl';

import UsersModel from '../src/app/models/Users';

factory.define('User', UsersModel, {
  name: () => faker.name.findName(),
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
});

export default factory;
