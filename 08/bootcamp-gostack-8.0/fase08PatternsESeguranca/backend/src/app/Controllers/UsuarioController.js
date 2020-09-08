import UsuarioModel from '../Models/Usuario';

class UsuarioController {
  async store(req, res) {
    const usuarioExiste = await UsuarioModel.findOne({
      where: { email: req.body.email },
    });

    if (usuarioExiste) {
      return res
        .status(401)
        .json({ erro: 'Já existe um usuário com esse email.' });
    }

    const usuario = await UsuarioModel.create(req.body);
    const { id, nome, email } = usuario;

    return res.json({ id, nome, email });
  }

  async update(req, res) {
    const usuario = await UsuarioModel.findByPk(req.usuario_id);

    if (req.body.email && req.body.email !== usuario.email) {
      const usuarioExiste = await UsuarioModel.findOne({
        where: { email: req.body.email },
      });

      if (usuarioExiste) {
        return res
          .status(400)
          .json({ erro: 'Já existe um usuário com este e-mail.' });
      }
    }

    if (
      req.body.senhaAntiga &&
      !(await usuario.verificarSenha(req.body.senhaAntiga))
    ) {
      return res.status(401).json({ errro: 'Senha antiga não bate' });
    }

    const usuarioAtualizado = await usuario.update(req.body);
    const { id, nome, email } = usuarioAtualizado;

    return res.json({ id, nome, email });
  }
}

export default new UsuarioController();