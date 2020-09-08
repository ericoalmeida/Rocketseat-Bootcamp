import { Op } from 'sequelize';
import TipoOrdemServicosModel from '../Models/TipoOrdemServicos';

class TotalTiposOrdemServicoController {
  async show(req, res) {
    const { filtro = '' } = req.query;

    const total = await TipoOrdemServicosModel.count({
      where: {
        descricao: { [Op.like]: `%${filtro}%` },
      },
    });

    return res.json({ total });
  }
}

export default new TotalTiposOrdemServicoController();
