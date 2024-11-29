import { config } from "dotenv";

config({
  path: ".env",
});

export const { PORT, DATABASE_URL, BASE_WEB_URL } = process.env;
