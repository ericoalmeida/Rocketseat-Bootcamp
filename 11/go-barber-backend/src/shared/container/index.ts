import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/Providers';

import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@appointments/infra/typeorm/repositories/AppointmentsRepository';
import IUsersRepository from '@users/repositories/IUsersRepository';
import UsersRepository from '@users/infra/typeorm/repositories/UsersRepository';
import IUserTokenRepository from '@users/repositories/IUserTokenRepository';
import UserTokenRepository from '@users/infra/typeorm/repositories/UserTokenRepository';
import INotificationsRepository from '@notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
