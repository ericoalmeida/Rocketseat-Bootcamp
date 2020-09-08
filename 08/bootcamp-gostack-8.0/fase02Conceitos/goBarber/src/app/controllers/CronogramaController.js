import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import UsuarioModel from '../models/Usuario';
import AgendamentoModel from '../models/Agendamento';
import ArquivoModel from '../models/Arquivo';

class CronogramaController {
  async index(req, res) {
    const UsuarioPrestador = await UsuarioModel.findOne({
      where: { id: req.usuario_id, provedor: true },
    });

    if (!UsuarioPrestador) {
      return res
        .status(400)
        .json({ erro: 'Você não é um prestador de serviços' });
    }

    const data = req.query.data ? parseISO(req.query.data) : new Date();

    const agendamento = await AgendamentoModel.findAll({
      where: {
        provedor_id: req.usuario_id,
        datacancelamento: null,
        data: {
          [Op.between]: [startOfDay(data), endOfDay(data)],
        },
      },
      order: ['data'],
      attributes: ['id', 'data'],
      include: [
        {
          model: UsuarioModel,
          as: 'usuario',
          attributes: ['id', 'nome'],
          include: [
            {
              model: ArquivoModel,
              as: 'avatar',
              attributes: ['id', 'nome', 'diretorio', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(agendamento);
  }
}

export default new CronogramaController();
