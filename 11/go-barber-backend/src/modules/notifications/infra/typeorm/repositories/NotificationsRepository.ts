import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@notifications/dtos/ICreateNotificationDTO';
import Notification from '@notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create(data: ICreateNotificationDTO): Promise<Notification> {
    const { content, recipient_id } = data;

    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
