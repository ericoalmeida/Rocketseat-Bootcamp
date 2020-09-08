import * as Yup from 'yup';
import UsuarioModel from '../models/Usuario';
import ArquivoModel from '../models/Arquivo';

class UsuarioController {
  async store(req, res) {
    const esquema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string()
        .min(6)
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validacao dos dados.' });
    }

    const usuarioExiste = await UsuarioModel.findOne({
      where: { email: req.body.email },
    });

    if (usuarioExiste) {
      return res
        .status(400)
        .json({ error: 'Este e-mail já está sendo utilizado.' });
    }

    const { id, nome, provedor } = await UsuarioModel.create(req.body);

    return res.json({ id, nome, provedor });
  }

  async update(req, res) {
    const esquema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      senhaAntiga: Yup.string().min(6),
      senha: Yup.string()
        .min(6)
        .when('senhaAntiga', (senhaAntiga, campo) =>
          senhaAntiga ? campo.required() : campo
        ),
      confirmacaoSenha: Yup.string().when('senha', (senha, campo) =>
        senha ? campo.required().oneOf([Yup.ref('senha')]) : campo
      ),
      avatar_id: Yup.number(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a vallidacao dos dados' });
    }

    const usuario = await UsuarioModel.findByPk(req.usuario_id);

    if (req.body.email && req.body.email !== usuario.email) {
      const usuarioExiste = await UsuarioModel.findOne({
        where: { email: req.body.email },
      });

      if (usuarioExiste) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário com esse email' });
      }
    }

    if (
      req.body.senhaAntiga &&
      !(await usuario.verificarSenha(req.body.senhaAntiga))
    ) {
      return res.status(401).json({ error: 'Senha antiga não bate!' });
    }

    await usuario.update(req.body);

    const { id, nome, email, provedor, avatar } = await UsuarioModel.findByPk(
      req.usuario_id,
      {
        include: [
          {
            model: ArquivoModel,
            as: 'avatar',
            attributes: ['id', 'diretorio', 'url'],
          },
        ],
      }
    );

    return res.json({ id, nome, email, provedor, avatar });
  }
}

export default new UsuarioController();
