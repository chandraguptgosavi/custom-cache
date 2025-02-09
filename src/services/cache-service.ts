import CacheRepository from "../repository/cache-repository";

class CacheService {
    private repository: CacheRepository;

    constructor(repository: CacheRepository) {
        this.repository = repository;
    }

    public async getCache(key: string): Promise<any | null> {
        return await this.repository.getCache(key);
    }

    public async setCache(key: string, value: string): Promise<void> {
        await this.repository.setCache(key, value);
    }

    public async deleteCache(key: string): Promise<void> {
        await this.repository.deleteCache(key);
    }

    public async hasCache(key: string): Promise<boolean> {    
        return await this.repository.hasCache(key);
    }
}

export default CacheService;