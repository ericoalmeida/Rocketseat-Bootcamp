import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import AppErrors from '@shared/errors/AppErrors';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const rateLimit = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate-limit',
  points: 5,
  duration: 1,
});

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await rateLimit.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppErrors('Too many requests', 429);
  }
}

export default rateLimiter;
