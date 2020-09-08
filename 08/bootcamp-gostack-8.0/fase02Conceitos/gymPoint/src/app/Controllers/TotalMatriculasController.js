import { Op } from 'sequelize';
import MatriculaModel from '../Models/Matricula';
import AlunoModel from '../Models/Aluno';

class TotalMatriculasController {
  async show(req, res) {
    const { filtro = '' } = req.query;

    const lista = await MatriculaModel.findAll({
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

    const totalMatricula = lista.length;

    return res.json({ total: totalMatricula });
  }
}

export default new TotalMatriculasController();
