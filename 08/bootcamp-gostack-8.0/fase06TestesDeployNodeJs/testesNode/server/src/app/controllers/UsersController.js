import UsersModel from '../models/Users';

class UsersController {
  async store(req, res) {
    const { email } = req.body;

    const checkEmail = await UsersModel.findOne({ where: { email } });

    if (checkEmail) {
      return res.status(400).json({ error: 'this email already exists' });
    }

    const user = await UsersModel.create(req.body);

    return res.status(200).json(user);
  }
}

export default new UsersController();
