# JSON Utils

A backend utility to generate HTML forms and JSON Schemas from arbitrary JSON at runtime, validate payloads, and provide stateless CRUD echoes. Includes encrypted request logging and a logs endpoint.

## Features
- JSON → HTML Form or JSON Schema (at runtime)
- 3 modes for HTML forms: none | bootstrap | materialize
- Validation with Ajv (schema inferred from payload)
- Stateless CRUD echoes for scaffolding
- Encrypted request logging, decrypted logs endpoint
- CORS enabled for local testing

## Install
- Node.js 18+
- npm install
- Copy .env.example → .env and set:
  - PORT (default 4000)
  - API_KEY
  - SYSTEM_KEY (stable for log decryption)

## Run
- npm start
- Base URL: http://localhost:4000/v1

## Auth
All requests require:
- Authorization: Bearer <API_KEY>

## Headers
- X-Operation: FORM | VALIDATE | CREATE | READ | UPDATE | DELETE
- X-Response-Type: html | json (FORM only)
- X-CSS-Framework: none | bootstrap | materialize (FORM only)
- X-JSON-Payload: stringified JSON object

## Endpoints
### POST /v1/forms
Behavior by X-Operation:
- FORM + html → returns HTML form
- FORM + json → returns inferred JSON Schema
- VALIDATE → returns { valid, errors } using Ajv
- CRUD → returns { status, data }

Example (HTML form / Bootstrap):
curl -X POST http://localhost:4000/v1/forms \
  -H "Authorization: Bearer MY_KEY" \
  -H "X-Operation: FORM" \
  -H "X-Response-Type: html" \
  -H "X-CSS-Framework: bootstrap" \
  -H 'X-JSON-Payload: {"name":"Alice","age":25}'

### GET /v1/logs
- Returns JSON array of decrypted plaintext JSON strings
- Client should parse each string:
  const obj = JSON.parse(entry)

## Three modes
- none: semantic classes only (form-group, input-field, section-title)
- bootstrap: form-control, mb-3
- materialize: input-field, card-panel

## Security
- Keep SYSTEM_KEY stable (AES-256-CBC for logs)
- Use HTTPS in production
- Don’t commit real secrets

## Troubleshooting
- “Failed to decrypt log”: key changed or corrupted log line. Ensure SYSTEM_KEY is unchanged since logs were written, or remove bad lines.
- 403 Unauthorized: check Authorization header contains the API key.

## Contributing
See docs/contributing.md for workflow and coding standards.

## License
Choose a license and include in repo root and docs/LICENSE.md.
