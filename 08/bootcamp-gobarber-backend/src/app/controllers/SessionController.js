import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authenticationSettings from '../../settings/authentication';
import UserModel from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      mail: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { mail, password } = req.body;

    const user = await UserModel.findOne({ where: { mail } });

    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name } = user;
    const { secret, expiresIn } = authenticationSettings;

    return res.json({
      user: { id, name, mail },
      token: jwt.sign({ id }, secret, { expiresIn }),
    });
  }
}

export default new SessionController();
