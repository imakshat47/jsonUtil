export function parsePayload(req) {
  try {
    return JSON.parse(req.headers["x-json-payload"]);
  } catch {
    return {};
  }
}
