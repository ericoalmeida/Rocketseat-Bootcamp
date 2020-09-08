import { Op } from 'sequelize';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import FrequenciaAlunoModel from '../Models/FrequenciaAlunos';

class TotalFrequenciaAlunoController {
  async show(req, res) {
    const { id } = req.params;

    const dataInicial = subDays(new Date(), 7);
    const dataFinal = new Date();

    const total = await FrequenciaAlunoModel.count({
      where: {
        aluno_id: id,
        createdAt: {
          [Op.between]: [startOfDay(dataInicial), endOfDay(dataFinal)],
        },
      },
    });

    return res.json({ total });
  }
}

export default new TotalFrequenciaAlunoController();
