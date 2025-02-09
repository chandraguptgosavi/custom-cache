require("dotenv").config();

export const PORT = process.env.PORT || 3001;

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PORT = process.env.REDIS_PORT ? +process.env.REDIS_PORT : 10434;
 