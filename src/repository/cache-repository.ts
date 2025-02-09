import { CacheStore } from "../cache-store/types/cache-store";

class CacheRepository {
  private cacheStore: CacheStore;

  constructor(cacheStore: CacheStore) {
    this.cacheStore = cacheStore;
  }

  public async getCache(key: string): Promise<string | null> {
    return await this.cacheStore.get(key);
  }

  public async setCache(key: string, data: string): Promise<void> {
    await this.cacheStore.set(key, data);
  }

  public async deleteCache(key: string): Promise<void> {
    await this.cacheStore.delete(key);
  }

  public async hasCache(key: string): Promise<boolean> {
    return await this.cacheStore.exists(key);
  }
}

export default CacheRepository;