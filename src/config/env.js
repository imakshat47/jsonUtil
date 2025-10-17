import dotenv from "dotenv";
dotenv.config();

export function loadEnv() {
  return {
    PORT: process.env.PORT || 4000,
    API_KEY: process.env.API_KEY,
    SYSTEM_KEY: process.env.SYSTEM_KEY
  };
}
