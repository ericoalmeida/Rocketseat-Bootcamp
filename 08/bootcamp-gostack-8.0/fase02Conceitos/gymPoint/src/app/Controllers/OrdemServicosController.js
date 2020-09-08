import * as Yup from 'yup';
import { Op } from 'sequelize';

import OrdemServicosModel from '../Models/OrdemServicos';
import TipoOrdemServicosModel from '../Models/TipoOrdemServicos';
import AlunoModel from '../Models/Aluno';

import EmailRetornoSolicitacao from '../Jobs/EmailRetornoSolicitacao';
import BackgroundJobs from '../../lib/BackgroundJobs';

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
    const esquema = Yup.object().shape({
      retorno: Yup.string().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validação dos dados' });
    }

    const ordemServico = await OrdemServicosModel.findByPk(req.params.id);

    if (!ordemServico) {
      return res.status(400).json({ erro: 'Ordem de serviço não econtrado' });
    }

    const { retorno } = req.body;
    const resolvido = true;

    await ordemServico.update({
      retorno,
      resolvido,
      data_retorno: new Date(),
    });

    const ordemServicoAtualizada = await OrdemServicosModel.findByPk(
      ordemServico.id,
      {
        attributes: [
          'id',
          'solicitacao',
          'retorno',
          'createdAt',
          'data_retorno',
          'resolvido',
        ],
        include: [
          {
            model: AlunoModel,
            as: 'aluno',
            attributes: ['id', 'nome', 'email'],
          },
          {
            model: TipoOrdemServicosModel,
            as: 'tipo_ordem',
            attributes: ['id', 'descricao'],
          },
        ],
      }
    );

    await BackgroundJobs.add(
      EmailRetornoSolicitacao.key,
      ordemServicoAtualizada
    );

    return res.json(ordemServicoAtualizada);
  }
}

export default new OrdemServicosController();
