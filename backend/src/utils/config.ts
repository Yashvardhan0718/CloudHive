import { config } from "dotenv";

config();

const port = process.env.PORT || 5000;
const allowedOrigin =
  process.env.ALLOWED_ORIGIN || "https://cloud-hive.vercel.app";

export { port, allowedOrigin };
