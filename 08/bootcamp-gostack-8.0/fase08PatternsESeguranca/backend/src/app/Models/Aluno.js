import Sequelize, { Model } from 'sequelize';

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso: Sequelize.DOUBLE,
        altura: Sequelize.DOUBLE,
      },
      { sequelize }
    );

    return this;
  }
}

export default Aluno;
