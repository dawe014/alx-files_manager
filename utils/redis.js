import redis from "redis";

// Class for performing operations with Redis service

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on("error", (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
    this.client.on("connect", () => {});
  }

  // Checks if connection to Redis is Alive
  isAlive() {
    return this.client.connected;
  }

  // Gets value corresponding to key in Redis
  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          return reject(error);
        }
        resolve(value);
      });
    });
  }

  // Creates a new key in Redis with a specific TTL
  set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }

  // Deletes key in Redis service
  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
