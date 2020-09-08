import UserModel from '../models/User';
import NotificationSchema from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const userIsProvider = await UserModel.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!userIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can read notifications' });
    }

    const notifications = await NotificationSchema.find({
      user: req.userId,
    });

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await NotificationSchema.findOneAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
