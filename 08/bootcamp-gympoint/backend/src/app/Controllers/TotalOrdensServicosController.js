import { Op } from 'sequelize';
import AlunoModel from '../Models/Aluno';
import OrdemServicosModel from '../Models/OrdemServicos';

class TotalOrdensServicosController {
  async show(req, res) {
    const {
      pagina = 1,
      limite = 10,
      resolvido = false,
      filtro = '',
    } = req.query;

    const total = await OrdemServicosModel.count({
      where: { resolvido },
      limit: limite,
      offset: (pagina - 1) * limite,
      include: [
        {
          model: AlunoModel,
          as: 'aluno',
          attributes: ['id', 'nome'],
          where: {
            nome: { [Op.like]: `%${filtro}%` },
          },
        },
      ],
    });

    return res.json({ total });
  }
}

export default new TotalOrdensServicosController();
