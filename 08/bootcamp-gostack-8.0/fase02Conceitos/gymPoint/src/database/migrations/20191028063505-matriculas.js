module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('matriculas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'alunos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      plano_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'planos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      data_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      data_termino: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      preco_total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('matriculas');
  },
};
