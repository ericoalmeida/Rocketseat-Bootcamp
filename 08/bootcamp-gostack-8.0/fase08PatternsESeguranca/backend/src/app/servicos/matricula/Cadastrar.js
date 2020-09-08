import { isBefore, parseISO } from 'date-fns';

import AlunoModel from '../../Models/Aluno';
import MatriculaModel from '../../Models/Matricula';
import PlanoModel from '../../Models/Plano';

class Cadastrar {
  async run({ plano_id, aluno_id, data_inicio }) {
    if (isBefore(parseISO(data_inicio), new Date())) {
      throw new Error(
        'Não e possivel matricular uma aluno com data ja passada'
      );
    }

    const aluno = await AlunoModel.findByPk(aluno_id, {
      attributes: ['id', 'nome'],
    });

    if (!aluno) {
      throw new Error('Aluno não encontrado!');
    }

    const alunoPossuiPlanoAtivo = await MatriculaModel.findOne({
      where: { aluno_id },
    });

    if (alunoPossuiPlanoAtivo) {
      if (!isBefore(parseISO(alunoPossuiPlanoAtivo.data_termino), new Date())) {
        throw new Error('Este aluno ja possui uma matrícula ativa');
      }
    }

    const plano = await PlanoModel.findByPk(plano_id, {
      attributes: ['id', 'titulo', 'duracao', 'preco'],
    });

    if (!plano) {
      throw new Error('Plano não encontrado!');
    }

    const data_termino = plano.calcularDataTermino(
      parseISO(data_inicio).getTime()
    );

    const preco_total = plano.calcularValorTotal();

    const matricula = await MatriculaModel.create({
      aluno_id,
      plano_id,
      data_inicio,
      data_termino,
      preco_total,
    });

    return matricula;
  }
}

export default new Cadastrar();
