import crypto from 'crypto';

import connection from '../database/connection';

class OngController {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  }

  async store(request, response) {
    const id = crypto.randomBytes(4).toString('HEX');

    const { name, email, whatsapp, city, uf } = request.body;

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  }
}

export default new OngController();
