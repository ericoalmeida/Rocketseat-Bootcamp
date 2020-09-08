import { Op } from 'sequelize';

import OrdemServicosModel from '../Models/OrdemServicos';
import TipoOrdemServicosModel from '../Models/TipoOrdemServicos';
import AlunoModel from '../Models/Aluno';

import AtualizarOrdemServico from '../servicos/ordemServico/Atualizar';

class OrdemServicosController {
  async index(req, res) {
    const {
      pagina = 1,
      limite = 10,
      resolvido = false,
      filtro = '',
    } = req.query;

    const ordensServico = await OrdemServicosModel.findAll({
      where: { resolvido },
      attributes: ['id', 'solicitacao', 'retorno', 'data_retorno', 'resolvido'],
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
        {
          model: TipoOrdemServicosModel,
          as: 'tipo_ordem',
          attributes: ['id', 'descricao'],
        },
      ],
    });

    return res.json(ordensServico);
  }

  async show(req, res) {
    const { id } = req.params;

    const ordemServico = await OrdemServicosModel.findByPk(id, {
      attributes: ['id', 'solicitacao', 'retorno'],
      include: [
        {
          model: AlunoModel,
          as: 'aluno',
          attributes: ['id', 'nome'],
        },
      ],
    });

    if (!ordemServico) {
      return res.status(400).json({ erro: 'Ordem de Serviço não encontrada.' });
    }

    return res.json(ordemServico);
  }

  async update(req, res) {
    const ordemServicoAtualizada = await AtualizarOrdemServico.run({
      ordemServico_id: req.params.id,
      retorno: req.body.retorno,
    });

    return res.json(ordemServicoAtualizada);
  }
}

export default new OrdemServicosController();
