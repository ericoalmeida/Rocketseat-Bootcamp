import { isBefore, parseISO } from 'date-fns';

import MatriculaModel from '../../Models/Matricula';
import AlunoModel from '../../Models/Aluno';
import PlanoModel from '../../Models/Plano';

class Atualizar {
  async run({ matricula_id, aluno_id, plano_id, data_inicio }) {
    const matricula = await MatriculaModel.findByPk(matricula_id);

    if (!matricula) {
      throw new Error('Matrícula nao encontrada!');
    }

    const aluno = await AlunoModel.findByPk(aluno_id, {
      attributes: ['id', 'nome'],
    });

    if (!aluno) {
      throw new Error('Aluno não encontrado!');
    }

    const plano = await PlanoModel.findByPk(plano_id, {
      attributes: ['id', 'titulo', 'duracao', 'preco'],
    });

    if (!plano) {
      throw new Error('Plano não encontrado!');
    }

    if (isBefore(parseISO(data_inicio), new Date())) {
      throw new Error(
        'Não e possivel matricular uma aluno com data ja passada'
      );
    }

    const data_termino = plano.calcularDataTermino(
      parseISO(data_inicio).getTime()
    );

    const preco_total = plano.calcularValorTotal();

    const matriculaAtualizada = await matricula.update({
      aluno_id,
      plano_id,
      data_inicio,
      data_termino,
      preco_total,
    });

    return matriculaAtualizada;
  }
}

export default new Atualizar();
