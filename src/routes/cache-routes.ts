import { Router } from "express";
import { deleteCache, getCache, setCache } from "../controllers/cache-controller";

const cacheRouter = Router();

cacheRouter.get("/:key", getCache);

cacheRouter.post("/", setCache);

cacheRouter.delete("/:key", deleteCache);

export default cacheRouter;