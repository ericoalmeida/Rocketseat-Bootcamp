import Sequelize, { Model } from 'sequelize';

class OrdemServicos extends Model {
  static init(sequelize) {
    super.init(
      {
        solicitacao: Sequelize.STRING,
        retorno: Sequelize.STRING,
        resolvido: Sequelize.BOOLEAN,
        data_retorno: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  static associarCampo(model) {
    this.belongsTo(model.Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
    this.belongsTo(model.TipoOrdemServicos, {
      foreignKey: 'tipo_ordem_id',
      as: 'tipo_ordem',
    });
  }
}

export default OrdemServicos;
