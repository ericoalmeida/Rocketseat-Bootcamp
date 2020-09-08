module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('agendamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      provedor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      datacancelamento: {
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
    return queryInterface.dropTable('agendamentos');
  },
};
