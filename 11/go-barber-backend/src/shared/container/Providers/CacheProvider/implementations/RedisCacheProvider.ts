import IoRedis, { Redis } from 'ioredis';

import cacheConfig from '@config/cache';
import ICacheProvider from '@shared/container/Providers/CacheProvider/models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: Redis;

  constructor() {
    this.client = new IoRedis(cacheConfig.settings.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public async invalidate(key: string): Promise<void> {
    this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export default RedisCacheProvider;
