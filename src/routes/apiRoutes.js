import express from "express";
import { apiAuth } from "../middleware/auth.js";
import { logRequest, readLogs } from "../middleware/logger.js";
import { generateHTMLForm, generateJSONSchema } from "../services/formGenerator.js";
import { validateJSON } from "../services/validator.js";
import { handleCRUD } from "../services/crudHandler.js";

const router = express.Router();

function parsePayload(req) {
  try {
    return JSON.parse(req.headers["x-json-payload"] || "{}");
  } catch {
    return {};
  }
}

router.post("/forms", apiAuth, logRequest, (req, res) => {
  const operation = req.headers["x-operation"];
  const responseType = req.headers["x-response-type"];
  const cssFramework = req.headers["x-css-framework"] || "none";
  const payload = parsePayload(req);

  if (operation === "FORM") {
    return responseType === "html"
      ? res.send(generateHTMLForm(payload, "", cssFramework))
      : res.json(generateJSONSchema(payload));
  }

  if (operation === "VALIDATE") {
    const schema = generateJSONSchema(payload);
    return res.json(validateJSON(schema, payload));
  }

  return res.json(handleCRUD(operation, payload));
});

// Logs endpoint returns array of decrypted JSON strings
router.get("/logs", apiAuth, (req, res) => {
  const logs = readLogs();
  res.json(logs); // Array of decrypted JSON strings
});

router.get("/", (req, res) => {
  res.json({ status: "ok", service: "JSON EHR Utils API" });
});

export default router;
