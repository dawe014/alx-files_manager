
// import { createClient } from "redis";

const redis = require('redis')

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

this.connected = this.client.on("connect", () => {
});

    this.client.connect().catch(console.error);
  }

  isAlive() {
    
    return !!this.connected;
  }

  async get(key) {
    if (!this.isAlive()) {
      throw new Error("Redis client is not connected");
    }
    return this.client.get(key);
  }

  async set(key, value, duration) {
    if (!this.isAlive()) {
      throw new Error("Redis client is not connected");
    }
    await this.client.SETEX(key, duration, value);
  }

  async del(key) {
    if (!this.isAlive()) {
      throw new Error("Redis client is not connected");
    }
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = { redisClient };
