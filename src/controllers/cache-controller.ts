import { Request, Response } from "express";
import RedisCache from "../cache-store/redis-cache-store";
import CacheRepository from "../repository/cache-repository";
import CacheService from "../services/cache-service";

const redisCache = RedisCache.getInstance();
const cacheRepository = new CacheRepository(redisCache);
const cacheService = new CacheService(cacheRepository);

export const getCache = async (request: Request, response: Response) => {
  const { key } = request.params;
  if (!key) {
    response.status(400).send("Key is required");
  }
  try {
    const exists = await cacheService.hasCache(key);

    if (!exists) {
      response.status(404).send("Key not found");
      return;
    }

    const cache = await cacheService.getCache(key);
    const value = cache ? JSON.parse(cache) : null;
    response.status(200).send(value);
  } catch (err) {
    console.error(`Error getting cache for key "${key}":`, err);
    response.status(500).send("Error getting cache");
  }
};

export const setCache = async (request: Request, response: Response) => {
  const { key, value } = request.body;
  if (!key || !value) {
    response.status(400).send("Invalid request body");
    return;
  }

  try {
    const data = JSON.stringify(value);
    await cacheService.setCache(key, data);
    response.status(201).send();
  } catch (err) {
    if (err === "Cache limit reached! You cannot add more items.") {
      response.status(422).send(err);
      console.error(err);
      return;
    }

    console.error(`Error setting cache for key "${key}":`, err);
    response.status(500).send("Error setting cache");
  }
};

export const deleteCache = async (request: Request, response: Response) => {
  const { key } = request.params;
  if (!key) {
    response.status(400).send("Key is required");
  }

  try {
    const exists = await cacheService.hasCache(key);

    if (!exists) {
      response.status(404).send("Key not found");
      return;
    }

    await cacheService.deleteCache(key);
    response.status(204).send();
  } catch (err) {
    console.error(`Error deleting cache for key "${key}":`, err);
    response.status(500).send("Error deleting cache");
  }
};
