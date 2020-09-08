import Sequelize, { Model } from 'sequelize';
import { isAfter, parseISO } from 'date-fns';

class Matricula extends Model {
  static init(sequelize) {
    super.init(
      {
        data_inicio: Sequelize.DATEONLY,
        data_termino: Sequelize.DATEONLY,
        preco_total: Sequelize.DOUBLE,
        ativa: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, ['data_termino']),
          get() {
            return !isAfter(new Date(), parseISO(this.get('data_termino')));
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associarCampo(model) {
    this.belongsTo(model.Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
    this.belongsTo(model.Plano, { foreignKey: 'plano_id', as: 'plano' });
  }
}

export default Matricula;
