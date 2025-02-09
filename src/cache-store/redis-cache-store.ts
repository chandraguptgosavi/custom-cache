import { createClient, RedisClientType } from "redis";
import { REDIS_PASSWORD, REDIS_PORT, REDIS_URL } from "../config";
import { CacheStore } from "./types/cache-store";
import { CACHE_LIMIT_REACHED } from "../errors";

const MAX_CACHE_SIZE = 20;

class RedisCache implements CacheStore {
  private static instance: RedisCache;
  private client: RedisClientType;
  private static itemsCount = 0;

  private constructor() {
    this.client = createClient({
      username: "default",
      password: REDIS_PASSWORD,
      socket: {
        host: REDIS_URL,
        port: REDIS_PORT,
      },
    });
    this.client.on("error", (err) => console.error("Redis client error:", err));
    this.client.on("connect", () => console.log("Redis client connected"));
    this.client
      .connect()
      .catch((err) => console.error("Redis connection error:", err));
  }

  public static getInstance(): RedisCache {
    if (!RedisCache.instance) {
      RedisCache.instance = new RedisCache();
    }
    return RedisCache.instance;
  }

  public async set(key: string, value: string): Promise<void> {
    if (RedisCache.itemsCount === MAX_CACHE_SIZE) {
      throw new Error(CACHE_LIMIT_REACHED);
    }

    try {
      await this.client.set(key, value);
      RedisCache.itemsCount++;
    } catch (err) {
      console.error(`Error setting key "${key}":`, err);
      throw err;
    }
  }

  public async get(key: string): Promise<string | null> {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Error getting key "${key}":`, err);
      throw err;
    }
  }

  public async delete(key: string): Promise<number> {
    try {
      const deletedCount = await this.client.del(key);
      return deletedCount;
    } catch (err) {
      console.error(`Error deleting key "${key}":`, err);
      throw err;
    }
  }

  public async exists(key: string): Promise<boolean> {
    try {
      const exists = await this.client.exists(key);
      return exists === 1;
    } catch (err) {
      console.error(`Error checking if key "${key}" exists:`, err);
      throw err;
    }
  }
}

export default RedisCache;
