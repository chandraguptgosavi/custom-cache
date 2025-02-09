import express from "express";
import { PORT } from "./config";
import cacheRouter from "./routes/cache-routes";
import swaggerRouter from "./routes/swagger";

const app = express();

app.use(express.json());
app.use("/cache", cacheRouter);
app.use("/api-docs", swaggerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
