import { Op } from 'sequelize';
import AlunoModel from '../Models/Aluno';

class TotalAlunosController {
  async show(req, res) {
    const { filtro = '' } = req.query;

    const lista = await AlunoModel.findAll({
      where: {
        nome: { [Op.like]: `%${filtro}%` },
      },
    });

    const totalAlunos = lista.length;
    return res.json({ total: totalAlunos });
  }
}

export default new TotalAlunosController();
