import { Op } from 'sequelize';
import AlunoModel from '../Models/Aluno';

class TotalAlunosController {
  async show(req, res) {
    const { filtro = '' } = req.query;

    const total = await AlunoModel.count({
      where: {
        nome: { [Op.like]: `%${filtro}%` },
      },
    });

    return res.json({ total });
  }
}

export default new TotalAlunosController();
