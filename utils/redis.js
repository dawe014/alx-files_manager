import redis from "redis";

/**
 * Class for interacting with a Redis database.
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on("error", (error) => {
      console.error(
        `Redis client not connected to the server: ${error.message}`
      );
    });

    this.client.on("connect", () => {
      console.log("Connected to Redis server.");
    });
  }

  /**
   * Checks if the connection to Redis is active.
   * @returns {boolean} True if connected, otherwise false.
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * Retrieves the value associated with the specified key from Redis.
   * @param {string} key - The key to look up.
   * @returns {Promise<string|null>} A promise that resolves to the value, or null if not found.
   */
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

  /**
   * Sets a key in Redis with a specified value and expiration time.
   * @param {string} key - The key to set.
   * @param {string} value - The value to associate with the key.
   * @param {number} duration - The time-to-live (TTL) in seconds.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
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

  /**
   * Deletes the specified key from Redis.
   * @param {string} key - The key to delete.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
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

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
