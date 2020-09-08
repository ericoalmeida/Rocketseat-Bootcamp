import { Op } from 'sequelize';
import AlunoModel from '../Models/Aluno';

import Cache from '../../lib/Cache';

class AlunoController {
  async index(req, res) {
    const { pagina = 1, limite = 5, filtro = '' } = req.query;

    const cacheKey = `alunos:pagina:${pagina}:limite:${limite}:filtro:${filtro}`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const alunos = await AlunoModel.findAll({
      where: {
        nome: { [Op.like]: `%${filtro}%` },
      },
      order: [['nome', 'ASC']],
      limit: limite,
      offset: (pagina - 1) * limite,
      attributes: ['id', 'nome', 'email', 'altura', 'idade', 'peso'],
    });

    await Cache.set(cacheKey, alunos);

    return res.json(alunos);
  }

  async show(req, res) {
    const { alunoId } = req.params;

    const aluno = await AlunoModel.findByPk(alunoId, {
      attributes: ['id', 'nome', 'email', 'altura', 'idade', 'peso'],
    });

    if (!aluno) {
      return res.status(401).json({ error: 'Aluno não encontrado' });
    }

    return res.json(aluno);
  }

  async store(req, res) {
    const alunoExiste = await AlunoModel.findOne({
      where: { email: req.body.email },
    });

    if (alunoExiste) {
      return res
        .status(400)
        .json({ erro: 'Já existe um aluno com o e-mail informado.' });
    }

    const aluno = await AlunoModel.create(req.body);
    const { id, nome, email, altura, idade, peso } = aluno;

    if (aluno) {
      await Cache.invalidatePrefix('alunos');
    }

    return res.json({ id, nome, email, altura, idade, peso });
  }

  async update(req, res) {
    const aluno = await AlunoModel.findByPk(req.params.alunoId);

    if (!aluno) {
      return res.status(400).json({ erro: 'Aluno não encontrado.' });
    }

    const alunoExiste = await AlunoModel.findOne({
      where: { email: req.body.email },
    });

    if (alunoExiste) {
      return res
        .status(400)
        .json({ erro: 'Já existe um aluno com o e-mail informado.' });
    }

    const alunoAtualizado = await aluno.update(req.body);
    const { id, nome, email, idade, peso, altura } = alunoAtualizado;

    return res.json({ id, nome, email, idade, peso, altura });
  }

  async delete(req, res) {
    const aluno = await AlunoModel.findByPk(req.params.alunoId);

    if (!aluno) {
      return res.status(400).json({ erro: 'Aluno não encontrado' });
    }

    await aluno.destroy();

    return res.json({ status: 'Aluno excluído com sucesso!' });
  }
}

export default new AlunoController();
