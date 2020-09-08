import { subDays, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import FrequenciaAlunosModel from '../Models/FrequenciaAlunos';
import AlunoModel from '../Models/Aluno';

class FrequenciaAlunosController {
  async index(req, res) {
    const aluno = await AlunoModel.findByPk(req.params.alunoId);

    if (!aluno) {
      return res.status(400).json({ erro: 'Aluno não encontrado' });
    }

    const checkins = await FrequenciaAlunosModel.findAll({
      where: {
        aluno_id: req.params.alunoId,
      },
      attributes: ['id', 'createdAt'],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: AlunoModel,
          as: 'aluno',
          attributes: ['id', 'nome'],
        },
      ],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { alunoId: aluno_id } = req.params;

    const aluno = await AlunoModel.findByPk(aluno_id);

    if (!aluno) {
      return res.status(400).json({ erro: 'Aluno não encontrado' });
    }

    const dataInicial = subDays(new Date(), 7);
    const dataFinal = new Date();

    const quantidadeCheckins = await FrequenciaAlunosModel.count({
      where: {
        aluno_id,
        created_at: {
          [Op.between]: [startOfDay(dataInicial), endOfDay(dataFinal)],
        },
      },
    });

    if (quantidadeCheckins === 5) {
      return res
        .status(400)
        .json({ erro: 'Limite de checkins da semana atingido' });
    }

    const chekinAluno = await FrequenciaAlunosModel.create({ aluno_id });

    return res.json(chekinAluno);
  }
}

export default new FrequenciaAlunosController();
