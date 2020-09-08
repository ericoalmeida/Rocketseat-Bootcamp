import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        hash_senha: Sequelize.STRING,
        provedor: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async usuario => {
      if (usuario.senha) {
        usuario.hash_senha = await bcrypt.hash(usuario.senha, 8);
      }
    });

    return this;
  }

  static associarCampo(model) {
    this.belongsTo(model.Arquivo, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  verificarSenha(senha) {
    return bcrypt.compare(senha, this.hash_senha);
  }
}

export default Usuario;
