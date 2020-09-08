import jwt from 'jsonwebtoken';

import autenticacaoConfig from '../../config/autenticacao';
import UsuarioModel from '../Models/Usuario';

class SessaoController {
  async store(req, res) {
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
