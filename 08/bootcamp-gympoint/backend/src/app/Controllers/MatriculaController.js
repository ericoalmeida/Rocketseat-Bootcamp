import { Op } from 'sequelize';

import AlunoModel from '../Models/Aluno';
import PlanoModel from '../Models/Plano';
import MatriculaModel from '../Models/Matricula';

import CadastrarMatricula from '../servicos/matricula/Cadastrar';
import AtualizarMatricula from '../servicos/matricula/Atualizar';

class MatriculaController {
  async index(req, res) {
    const { pagina = 1, limite = 10, filtro = '' } = req.query;

    const matriculas = await MatriculaModel.findAll({
      attributes: ['id', 'data_inicio', 'data_termino', 'preco_total', 'ativa'],
      order: ['data_inicio'],
      limit: limite,
      offset: (pagina - 1) * limite,
      include: [
        {
          model: AlunoModel,
          as: 'aluno',
          attributes: ['id', 'nome'],
          where: {
            nome: {
              [Op.like]: `%${filtro}%`,
            },
          },
        },
        {
          model: PlanoModel,
          as: 'plano',
          attributes: ['id', 'titulo'],
        },
      ],
    });

    return res.json(matriculas);
  }

  async show(req, res) {
    const { matriculaId } = req.params;

    const matriculas = await MatriculaModel.findByPk(matriculaId, {
      attributes: ['id', 'data_inicio', 'data_termino', 'preco_total', 'ativa'],
      order: ['data_inicio'],
      include: [
        {
          model: AlunoModel,
          as: 'aluno',
          attributes: ['id', 'nome'],
        },
        {
          model: PlanoModel,
          as: 'plano',
          attributes: ['id', 'titulo'],
        },
      ],
    });

    if (!matriculas) {
      return res.status(401).json({ error: 'Matricula não encontrada!' });
    }

    return res.json(matriculas);
  }

  async store(req, res) {
    const { aluno_id, plano_id, data_inicio } = req.body;

    const matricula = await CadastrarMatricula.run({
      aluno_id,
      plano_id,
      data_inicio,
    });

    return res.json(matricula);
  }

  async update(req, res) {
    const { matriculaId } = req.params;
    const { aluno_id, plano_id, data_inicio } = req.body;

    const matriculaAtualizada = await AtualizarMatricula.run({
      matricula_id: matriculaId,
      aluno_id,
      plano_id,
      data_inicio,
    });

    return res.json(matriculaAtualizada);
  }

  async delete(req, res) {
    const { matriculaId } = req.params;

    const matricula = await MatriculaModel.findByPk(matriculaId);

    if (!matricula) {
      return res.status(400).json({ erro: 'Matrícula nao encontrada' });
    }

    await matricula.destroy();

    return res.json({ status: 'Matrícula excluída com sucesso' });
  }
}

export default new MatriculaController();
