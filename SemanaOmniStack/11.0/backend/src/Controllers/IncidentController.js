import connection from '../database/connection';

class IncidentController {
  async index(request, response) {
    const { page = 1, limit = 5 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(limit)
      .offset((page - 1) * limit)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  }

  async store(request, response) {
    const ong_id = request.headers.authorization;
    const { title, description, value } = request.body;

    const [id] = await connection('incidents').insert({
      ong_id,
      title,
      description,
      value,
    });

    return response.json({ id });
  }

  async delete(request, response) {
    const ong_id = request.headers.authorization;
    const { id } = request.params;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
}

export default new IncidentController();
