import { Op } from 'sequelize';
import PlanoModel from '../Models/Plano';

class TotalPlanosController {
  async show(req, res) {
    const { filtro = '' } = req.query;

    const lista = await PlanoModel.findAll({
      where: {
        titulo: { [Op.like]: `%${filtro}%` },
      },
    });

    const totalPlanos = lista.length;

    return res.json({ total: totalPlanos });
  }
}

export default new TotalPlanosController();
