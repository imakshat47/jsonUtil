import { loadEnv } from "../config/env.js";

const { API_KEY } = loadEnv();

export function apiAuth(req, res, next) {
  const headerKey = req.headers["authorization"];
  if (!headerKey || !headerKey.includes(API_KEY)) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
}
