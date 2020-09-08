import { Model, Sequelize } from 'sequelize';

class Arquivo extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        diretorio: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/arquivo/${this.diretorio}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default Arquivo;
