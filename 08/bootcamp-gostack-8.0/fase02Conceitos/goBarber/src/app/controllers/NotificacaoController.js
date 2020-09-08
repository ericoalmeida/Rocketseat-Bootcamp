import UsuarioModel from '../models/Usuario';
import Notificacao from '../schemas/notificacao';

class NotificacaoController {
  async index(req, res) {
    const usuarioProvedor = await UsuarioModel.findOne({
      where: { id: req.usuario_id, provedor: true },
    });

    if (!usuarioProvedor) {
      return res
        .status(400)
        .json({ erro: 'Apenas provedores possuem acesso as notificações.' });
    }

    const notificacoes = await Notificacao.find({
      usuario: req.usuario_id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notificacoes);
  }

  async update(req, res) {
    const notificacao = await Notificacao.findByIdAndUpdate(
      req.params.id,
      { lido: true },
      { new: true }
    );

    return res.json(notificacao);
  }
}

export default new NotificacaoController();
