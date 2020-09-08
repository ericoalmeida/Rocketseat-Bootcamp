import * as Yup from 'yup';
import { Op } from 'sequelize';
import AlunoModel from '../Models/Aluno';

class AlunoController {
  async index(req, res) {
    const { pagina = 1, limite = 5, filtro = '' } = req.query;

    const alunos = await AlunoModel.findAll({
      where: {
        nome: { [Op.like]: `%${filtro}%` },
      },
      order: [['nome', 'ASC']],
      limit: limite,
      offset: (pagina - 1) * limite,
      attributes: ['id', 'nome', 'email', 'altura', 'idade', 'peso'],
    });

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
    const esquema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      altura: Yup.number().required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validação dos dados.' });
    }

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

    return res.json({ id, nome, email, altura, idade, peso });
  }

  async update(req, res) {
    const esquema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string(),
      altura: Yup.number(),
      idade: Yup.number(),
      peso: Yup.number(),
    });

    if (!(await esquema.isValid(req.body))) {
      return res
        .status(400)
        .json({ erro: 'Falha durante a validação dos dados.' });
    }

    const aluno = await AlunoModel.findByPk(req.params.alunoId);

    if (!aluno) {
      return res.status(400).json({ erro: 'Aluno não encontrado.' });
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
