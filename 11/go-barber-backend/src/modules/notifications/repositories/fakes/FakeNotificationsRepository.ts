import { ObjectID } from 'mongodb';

import INotificationsRepository from '@notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@notifications/dtos/ICreateNotificationDTO';
import Notification from '@notifications/infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create(data: ICreateNotificationDTO): Promise<Notification> {
    const { content, recipient_id } = data;

    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
