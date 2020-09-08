import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.DATE,
        datacancelamento: Sequelize.DATE,
        realizado: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.data, new Date());
          },
        },
        cancelavel: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.data, 2));
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associarCampo(model) {
    this.belongsTo(model.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    this.belongsTo(model.Usuario, {
      foreignKey: 'provedor_id',
      as: 'provedor',
    });
  }
}

export default Agendamento;
