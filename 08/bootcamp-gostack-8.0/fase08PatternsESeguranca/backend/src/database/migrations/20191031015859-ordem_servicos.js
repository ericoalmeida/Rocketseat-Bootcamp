module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ordem_servicos', {
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
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      tipo_ordem_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'tipo_ordem_servicos', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },

      solicitacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      retorno: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      data_retorno: {
        type: Sequelize.DATE,
        allowNull: true,
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
    return queryInterface.dropTable('ordem_servicos');
  },
};
