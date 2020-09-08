import OrdemServicosModel from '../Models/OrdemServicos';
import TipoOrdemServicosModel from '../Models/TipoOrdemServicos';
import AlunoModel from '../Models/Aluno';

class OrdemServicosAlunosController {
  async index(req, res) {
    const aluno = await AlunoModel.findByPk(req.params.id);

    if (!aluno) {
      return res.status(400).json({ erro: 'Aluno não encontrado' });
    }

    const ordensServico = await OrdemServicosModel.findAll({
      where: { aluno_id: req.params.id },
      attributes: [
        'id',
        'created_at',
        'solicitacao',
        'retorno',
        'resolvido',
        'data_retorno',
      ],
      include: [
        {
          model: AlunoModel,
          as: 'aluno',
          attributes: ['id', 'nome'],
        },
        {
          model: TipoOrdemServicosModel,
          as: 'tipo_ordem',
          attributes: ['id', 'descricao'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.json(ordensServico);
  }

  async store(req, res) {
    const { id: aluno_id } = req.params;
    const { tipo_ordem_id, solicitacao } = req.body;
    const resolvido = false;

    const aluno = await AlunoModel.findByPk(aluno_id);

    if (!aluno) {
      return res.status(400).json({ erro: 'Aluno não encontrado' });
    }

    const tipoOrdem = await TipoOrdemServicosModel.findByPk(tipo_ordem_id);

    if (!tipoOrdem) {
      return res.status(400).json({ erro: 'Tipo de ordem não encontrado' });
    }

    const { id, createdAt: data } = await OrdemServicosModel.create({
      aluno_id,
      tipo_ordem_id,
      solicitacao,
      resolvido,
    });

    return res.json({ id, solicitacao, data });
  }

  async delete(req, res) {
    const ordemServico = await OrdemServicosModel.findByPk(req.params.id);

    if (!ordemServico) {
      return res.status(400).json({ erro: 'Ordem de serviço não encontrada' });
    }

    await ordemServico.destroy();

    return res.json({ status: 'Ordem de serviço removida com sucesso' });
  }
}

export default new OrdemServicosAlunosController();
