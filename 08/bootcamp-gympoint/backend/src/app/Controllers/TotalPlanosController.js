import { Op } from 'sequelize';
import PlanoModel from '../Models/Plano';

class TotalPlanosController {
  async show(req, res) {
    const { filtro = '' } = req.query;

    const total = await PlanoModel.count({
      where: {
        titulo: { [Op.like]: `%${filtro}%` },
      },
    });

    return res.json({ total });
  }
}

export default new TotalPlanosController();
