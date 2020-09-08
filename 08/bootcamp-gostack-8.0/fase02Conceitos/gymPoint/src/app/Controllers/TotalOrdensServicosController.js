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

    const lista = await OrdemServicosModel.findAll({
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

    const totalOrdemServico = lista.length;

    return res.json({ total: totalOrdemServico });
  }
}

export default new TotalOrdensServicosController();
