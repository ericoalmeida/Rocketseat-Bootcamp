import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import AutenticacaoConfig from '../../config/autenticacao';
import UsuarioModel from '../models/Usuario';
import ArquivoModel from '../models/Arquivo';

class SessaoController {
  async store(req, res) {
    const esquema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validação dos dados.' });
    }

    const { email, senha } = req.body;

    const usuario = await UsuarioModel.findOne({
      where: { email },
      include: [
        {
          model: ArquivoModel,
          as: 'avatar',
          attributes: ['id', 'diretorio', 'url'],
        },
      ],
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (!(await usuario.verificarSenha(senha))) {
      return res.status(401).json({ erro: 'Senha inválida' });
    }

    const { id, nome, avatar, provedor } = usuario;

    return res.json({
      usuario: {
        id,
        nome,
        email,
        avatar,
        provedor,
      },
      token: jwt.sign({ id }, AutenticacaoConfig.codigo, {
        expiresIn: AutenticacaoConfig.expiraEm,
      }),
    });
  }
}

export default new SessaoController();
