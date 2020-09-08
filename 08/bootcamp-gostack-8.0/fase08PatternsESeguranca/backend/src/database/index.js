import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import UsuarioModel from '../app/Models/Usuario';
import AlunoModel from '../app/Models/Aluno';
import PlanoModel from '../app/Models/Plano';
import MatriculaModel from '../app/Models/Matricula';
import FrequenciaAlunosModel from '../app/Models/FrequenciaAlunos';
import TipoOrdemServicosModel from '../app/Models/TipoOrdemServicos';
import OrdemServicosModel from '../app/Models/OrdemServicos';

const models = [
  UsuarioModel,
  AlunoModel,
  PlanoModel,
  MatriculaModel,
  FrequenciaAlunosModel,
  TipoOrdemServicosModel,
  OrdemServicosModel,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(
        model =>
          model.associarCampo && model.associarCampo(this.connection.models)
      );
  }
}

export default new Database();
