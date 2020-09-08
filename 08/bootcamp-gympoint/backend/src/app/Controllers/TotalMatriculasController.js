import { Op } from 'sequelize';
import MatriculaModel from '../Models/Matricula';
import AlunoModel from '../Models/Aluno';

class TotalMatriculasController {
  async show(req, res) {
    const { filtro = '' } = req.query;

    const total = await MatriculaModel.count({
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

export default new TotalMatriculasController();
