import { container } from 'tsyringe';

import ICacheProvider from '@shared/container/Providers/CacheProvider/models/ICacheProvider';
import RedisCacheProvider from '@shared/container/Providers/CacheProvider/implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
