import * as Yup from 'yup';
import UserModel from '../models/User';
import FileModel from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      mail: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await UserModel.findOne({
      where: { mail: req.body.mail },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (req.body.avatar_id) {
      const fileExists = await FileModel.findByPk(req.body.avatar_id);

      if (!fileExists) {
        return res.status(400).json({ error: 'Avatar not found' });
      }
    }

    const { id, name, mail, provider } = await UserModel.create(req.body);

    return res.json({ id, name, mail, provider });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      mail: Yup.string().email(),
      avatar_id: Yup.number(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { mail, oldPassword } = req.body;

    const user = await UserModel.findByPk(req.userId);

    if (mail && mail !== user.mail) {
      const userExists = await UserModel.findOne({ where: { mail } });

      if (userExists) {
        return res.status(401).json({ error: 'User Already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'oldPassword does not match' });
    }

    if (req.body.avatar_id) {
      const fileExists = await FileModel.findByPk(req.body.avatar_id);

      if (!fileExists) {
        return res.status(400).json({ error: 'Avatar not found' });
      }
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, mail });
  }
}

export default new UserController();
