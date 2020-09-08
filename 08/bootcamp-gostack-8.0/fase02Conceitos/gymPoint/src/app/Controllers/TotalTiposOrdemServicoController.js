import { Op } from 'sequelize';
import TipoOrdemServicosModel from '../Models/TipoOrdemServicos';

class TotalTiposOrdemServicoController {
  async show(req, res) {
    const { filtro = '' } = req.query;

    const totalTipoOrdem = await TipoOrdemServicosModel.findAll({
      where: {
        descricao: { [Op.like]: `%${filtro}%` },
      },
    });

    return res.json({ total: totalTipoOrdem.length });
  }
}

export default new TotalTiposOrdemServicoController();
