module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ordem_servicos', 'resolvido', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('ordem_servicos', 'resolvido');
  },
};
