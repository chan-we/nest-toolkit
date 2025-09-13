// redis.provider.ts
import { Provider } from '@nestjs/common';
import Redis from 'ioredis';

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: async () => {
    const client = new Redis({
      host: '38.55.124.222',
      port: 16379,
      password: 'canwe233'
      // password: 'yourpassword',
      // db: 0,
    });

    client.on('connect', () => {
      console.log('Redis 已连接');
    });

    client.on('error', (err) => {
      console.error('Redis 连接失败', err);
    });

    return client;
  },
};
