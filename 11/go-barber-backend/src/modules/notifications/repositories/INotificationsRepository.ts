import ICreateNotificationDTO from '@notifications/dtos/ICreateNotificationDTO';
import Notification from '@notifications/infra/typeorm/schemas/Notification';

interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}

export default INotificationsRepository;
