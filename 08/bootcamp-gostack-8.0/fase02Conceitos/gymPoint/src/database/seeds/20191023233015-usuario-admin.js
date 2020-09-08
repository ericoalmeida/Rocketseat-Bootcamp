const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nome: 'Administrador',
          email: 'admin@gympoint.com',
          senha_hash: bcrypt.hashSync('12345@', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('usuarios', null, {});
  },
};
