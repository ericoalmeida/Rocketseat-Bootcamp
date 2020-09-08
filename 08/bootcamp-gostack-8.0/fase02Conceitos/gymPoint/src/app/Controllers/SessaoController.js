import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import autenticacaoConfig from '../../config/autenticacao';
import UsuarioModel from '../Models/Usuario';

class SessaoController {
  async store(req, res) {
    const esquema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Falha na validação dos dados.' });
    }

    const { email, senha } = req.body;

    const usuario = await UsuarioModel.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(400).json({ erro: 'Usuario não encontrado.' });
    }

    if (!(await usuario.verificarSenha(senha))) {
      return res.status(401).json({ erro: 'Senha informada é inválida' });
    }

    const { id, nome } = usuario;

    return res.json({
      usuario: { id, nome, email },
      token: jwt.sign({ id }, autenticacaoConfig.segredo, {
        expiresIn: autenticacaoConfig.expiraEm,
      }),
    });
  }
}

export default new SessaoController();
