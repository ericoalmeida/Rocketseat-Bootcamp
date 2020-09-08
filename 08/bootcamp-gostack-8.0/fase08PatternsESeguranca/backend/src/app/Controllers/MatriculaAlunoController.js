import AlunoModel from '../Models/Aluno';
import MatriculaModel from '../Models/Matricula';

class MatriculaAlunoController {
  async show(req, res) {
    const { alunoId } = req.params;

    const matriculas = await MatriculaModel.findAll({
      attributes: ['id', 'data_termino', 'ativa'],
      order: ['data_inicio'],
      include: [
        {
          model: AlunoModel,
          as: 'aluno',
          attributes: ['id', 'nome'],
          where: { id: alunoId },
        },
      ],
    });

    if (!matriculas) {
      return res.status(401).json({ error: 'Matricula não encontrada!' });
    }

    return res.json(matriculas);
  }
}

export default new MatriculaAlunoController();
