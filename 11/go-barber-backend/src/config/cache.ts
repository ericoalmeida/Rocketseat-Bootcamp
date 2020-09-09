import { RedisOptions } from 'ioredis';

interface ICacheSettings {
  driver: 'redis';

  settings: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  settings: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheSettings;
