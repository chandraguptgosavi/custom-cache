export interface CacheStore {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<number>;
  exists(key: string): Promise<boolean>;
}
