import { createClient } from 'redis';

const redisClient = createClient({
  url: String(process.env.REDIS),
  password: String(process.env.REDIS_PASSWORD),
  username: String(process.env.REDIS_USER),
});

const loadRedis = async () =>
  new Promise(async (resolve, reject) => {
    redisClient.on('error', (err: any) => {
      console.log('redis', err);
      reject(err);
    });

    redisClient.on('connect', () => {
      console.log('Redis', 'Connected');
      resolve(true);
    });

    await redisClient.connect();
  });

const setInRedis = async (id: string, value: string) => {
  return redisClient
    .set(id, value, { EX: 15 * 60 })
    .catch((err) =>
      console.log(err));
};

const removeFromRedis = async (id: string) => {
  return redisClient
    .del(id)
    .catch((err) =>
      console.log(err));
};

const getFromRedis = async (id: string): Promise<any> => {
  try {
    let data = await redisClient.get(id);
    if (data) {
      data = JSON.parse(data);
    }

    return data;
  } catch (error) {
    return false;
  }
};

const emptyRedis = async () => {
  return redisClient
    .flushAll()
    .catch((err) =>
      console.log(err));
};

export { loadRedis, setInRedis, getFromRedis, redisClient, removeFromRedis, emptyRedis };
