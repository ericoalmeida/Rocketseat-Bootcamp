import { Model } from 'sequelize';

class FrequenciaAlunos extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });

    return this;
  }

  static associarCampo(model) {
    this.belongsTo(model.Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
  }
}

export default FrequenciaAlunos;
