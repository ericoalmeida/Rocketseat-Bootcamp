import * as Yup from 'yup';
import { Op } from 'sequelize';
import TipoOrdemServicosModel from '../Models/TipoOrdemServicos';

class TipoOrdemServicosController {
  async index(req, res) {
    const { pagina = 1, limite = 10, filtro = '' } = req.query;

    const tiposOrdem = await TipoOrdemServicosModel.findAll({
      where: {
        descricao: { [Op.like]: `%${filtro}%` },
      },
      attributes: ['id', 'descricao'],
      limit: limite,
      offset: (pagina - 1) * limite,
      order: [['descricao']],
    });

    return res.json(tiposOrdem);
  }

  async show(req, res) {
    const { tipoordemId } = req.params;

    const tipoOrdem = await TipoOrdemServicosModel.findByPk(tipoordemId, {
      attributes: ['id', 'descricao'],
    });

    if (!tipoOrdem) {
      return res
        .status(400)
        .json({ erro: 'Tipo de ordem de serviço não encontrado.' });
    }

    return res.json(tipoOrdem);
  }

  async store(req, res) {
    const esquema = Yup.object().shape({
      descricao: Yup.string().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validação dos dados' });
    }

    const { id, descricao } = await TipoOrdemServicosModel.create(req.body);

    return res.json({ id, descricao });
  }

  async update(req, res) {
    const esquema = Yup.object().shape({
      descricao: Yup.string().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validação dos dados' });
    }

    const tiposOrdem = await TipoOrdemServicosModel.findByPk(
      req.params.tipoordemId
    );

    if (!tiposOrdem) {
      return res.status(400).json({ erro: 'Tipo de ordem não encontrado' });
    }

    const { id, descricao } = await tiposOrdem.update(req.body);

    return res.json({ id, descricao });
  }

  async delete(req, res) {
    const tiposOrdem = await TipoOrdemServicosModel.findByPk(
      req.params.tipoordemId
    );

    if (!tiposOrdem) {
      return res.status(400).json({ erro: 'Tipo de ordem não encontrado' });
    }

    await tiposOrdem.destroy();

    return res.json({ status: 'Tipo de ordem excluído com sucesso' });
  }
}

export default new TipoOrdemServicosController();
