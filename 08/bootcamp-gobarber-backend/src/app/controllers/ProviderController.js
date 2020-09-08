import UserModel from '../models/User';
import FileModel from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await UserModel.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'mail'],
      include: [
        {
          model: FileModel,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
