import knex from 'knex';
import knexSettings from '../../knexfile';

const connection = knex(knexSettings.development);

export default connection;
