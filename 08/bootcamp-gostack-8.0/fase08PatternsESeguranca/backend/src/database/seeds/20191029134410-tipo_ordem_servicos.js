module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'tipo_ordem_servicos',
      [
        {
          descricao: 'Exercício',
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          descricao: 'Alimentação',
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          descricao: 'Outros',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('tipo_ordem_servicos', null, {});
  },
};
