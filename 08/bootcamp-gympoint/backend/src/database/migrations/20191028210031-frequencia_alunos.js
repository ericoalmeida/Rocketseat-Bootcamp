module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('frequencia_alunos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },

      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'alunos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('frequencia_alunos');
  },
};
