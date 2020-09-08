import OrdemServicosModel from '../Models/OrdemServicos';
import AlunoModel from '../Models/Aluno';

class TotalOrdensServicosAlunosController {
  async show(req, res) {
    const { resolvido = false } = req.query;
    const { id } = req.params;

    const total = await OrdemServicosModel.count({
      where: { resolvido },
      include: [
        {
          model: AlunoModel,
          as: 'aluno',
          where: {
            id,
          },
        },
      ],
    });

    return res.json({ total });
  }
}

export default new TotalOrdensServicosAlunosController();
