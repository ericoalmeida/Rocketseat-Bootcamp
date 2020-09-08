import Sequelize, { Model } from 'sequelize';
import { addMonths, parseISO, format } from 'date-fns';

class Plano extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        duracao: Sequelize.INTEGER,
        preco: Sequelize.DOUBLE,
      },
      { sequelize }
    );

    return this;
  }

  calcularValorTotal() {
    return this.duracao * this.preco;
  }

  calcularDataTermino(dataInicio) {
    const data_inicio = format(dataInicio, 'yyy-MM-dd');

    return format(addMonths(parseISO(data_inicio), this.duracao), 'yyy-MM-dd');
  }
}

export default Plano;
