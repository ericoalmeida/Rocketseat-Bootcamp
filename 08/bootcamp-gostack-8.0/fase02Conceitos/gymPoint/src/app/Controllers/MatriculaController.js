import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import AlunoModel from '../Models/Aluno';
import PlanoModel from '../Models/Plano';
import MatriculaModel from '../Models/Matricula';

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
    const esquema = Yup.object().shape({
      aluno_id: Yup.number().required(),
      plano_id: Yup.number().required(),
      data_inicio: Yup.date().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validação dos dados' });
    }

    const { aluno_id, plano_id, data_inicio } = req.body;

    if (isBefore(parseISO(data_inicio), new Date())) {
      return res.status(400).json({
        erro: 'Não e possivel matricular uma aluno com data ja passada',
      });
    }

    const aluno = await AlunoModel.findByPk(aluno_id, {
      attributes: ['id', 'nome'],
    });

    if (!aluno) {
      return res.status(400).json({ erro: 'Aluno não encontrado' });
    }

    const alunoPossuiPlanoAtivo = await MatriculaModel.findOne({
      where: { aluno_id },
    });

    if (alunoPossuiPlanoAtivo) {
      if (!isBefore(parseISO(alunoPossuiPlanoAtivo.data_termino), new Date())) {
        return res
          .status(400)
          .json({ error: `Este aluno ja possui uma matrícula ativa` });
      }
    }

    const plano = await PlanoModel.findByPk(plano_id, {
      attributes: ['id', 'titulo', 'duracao', 'preco'],
    });

    if (!plano) {
      return res.status(400).json({ erro: 'Plano não encontrado' });
    }

    const data_termino = plano.calcularDataTermino(
      parseISO(req.body.data_inicio).getTime()
    );

    const preco_total = plano.calcularValorTotal();

    const matricula = await MatriculaModel.create({
      aluno_id,
      plano_id,
      data_inicio,
      data_termino,
      preco_total,
    });

    return res.json(matricula);
  }

  async update(req, res) {
    const esquema = Yup.object().shape({
      aluno_id: Yup.number().required(),
      plano_id: Yup.number().required(),
      data_inicio: Yup.date().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validação dos dados' });
    }

    const { matriculaId } = req.params;
    const { aluno_id, plano_id, data_inicio } = req.body;

    const matricula = await MatriculaModel.findByPk(matriculaId);

    if (!matricula) {
      return res.status(400).json({ erro: 'Matrícula nao encontrada' });
    }

    const aluno = await AlunoModel.findByPk(aluno_id, {
      attributes: ['id', 'nome'],
    });

    if (!aluno) {
      return res.status(400).json({ erro: 'Aluno não encontrado' });
    }

    const plano = await PlanoModel.findByPk(plano_id, {
      attributes: ['id', 'titulo', 'duracao', 'preco'],
    });

    if (!plano) {
      return res.status(400).json({ erro: 'Plano não encontrado' });
    }

    const data_termino = plano.calcularDataTermino(
      parseISO(req.body.data_inicio).getTime()
    );

    const preco_total = plano.calcularValorTotal();

    const matriculaAtualizada = await matricula.update({
      aluno_id,
      plano_id,
      data_inicio,
      data_termino,
      preco_total,
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
