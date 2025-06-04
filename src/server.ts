import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();

const { PORT } = process.env;
const config = {
  host: "0.0.0.0",
  port: PORT ? parseInt(PORT) : 3000,
};

app.listen(config);
