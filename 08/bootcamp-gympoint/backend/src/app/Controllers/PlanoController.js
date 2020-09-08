import { Op } from 'sequelize';
import PlanoModel from '../Models/Plano';

class PlanoController {
  async index(req, res) {
    const { pagina = 1, limite = 5, filtro = '' } = req.query;

    const planos = await PlanoModel.findAll({
      where: {
        titulo: { [Op.like]: `%${filtro}%` },
      },
      order: [['titulo', 'ASC']],
      limit: limite,
      offset: (pagina - 1) * limite,
      attributes: ['id', 'titulo', 'duracao', 'preco'],
    });

    return res.json(planos);
  }

  async show(req, res) {
    const { planoId } = req.params;

    const plano = await PlanoModel.findByPk(planoId, {
      order: [['titulo', 'ASC']],
      attributes: ['id', 'titulo', 'duracao', 'preco'],
    });

    if (!plano) {
      return res.status(401).json({ error: 'Plano não encontrado' });
    }

    return res.json(plano);
  }

  async store(req, res) {
    const { id, titulo, duracao, preco } = await PlanoModel.create(req.body);

    return res.json({ id, titulo, duracao, preco });
  }

  async update(req, res) {
    const plano = await PlanoModel.findByPk(req.params.planoId);

    if (!plano) {
      return res.status(400).json({ erro: 'Plano não encontrado.' });
    }

    const planoAtualizado = await plano.update(req.body);
    const { id, titulo, duracao, preco } = planoAtualizado;

    return res.json({ id, titulo, duracao, preco });
  }

  async delete(req, res) {
    const plano = await PlanoModel.findByPk(req.params.planoId);

    if (!plano) {
      return res.status(400).json({ erro: 'Plano não encontrado' });
    }

    await plano.destroy();

    return res.json({ status: 'Plano excluído com sucesso!' });
  }
}

export default new PlanoController();
