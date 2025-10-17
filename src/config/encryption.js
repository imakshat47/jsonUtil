import CryptoJS from "crypto-js";
import { loadEnv } from "./env.js";

const { SYSTEM_KEY, API_KEY } = loadEnv();
const ENCRYPTION_KEY = SYSTEM_KEY + API_KEY;

export function encryptLog(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
}

export function decryptLog(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
