# Usage Examples

## Generate an HTML form
curl -X POST http://localhost:4000/v1/forms \
  -H "Authorization: Bearer MY_KEY" \
  -H "X-Operation: FORM" \
  -H "X-Response-Type: html" \
  -H "X-CSS-Framework: none" \
  -H 'X-JSON-Payload: {"name":"Alice","age":25}'

## Generate a JSON Schema
curl -X POST http://localhost:4000/v1/forms \
  -H "Authorization: Bearer MY_KEY" \
  -H "X-Operation: FORM" \
  -H "X-Response-Type: json" \
  -H 'X-JSON-Payload: {"name":"Alice","age":25}'

## Validate a payload
curl -X POST http://localhost:4000/v1/forms \
  -H "Authorization: Bearer MY_KEY" \
  -H "X-Operation: VALIDATE" \
  -H 'X-JSON-Payload: {"name":"Alice","age":25}'

## Stateless CRUD echo
curl -X POST http://localhost:4000/v1/forms \
  -H "Authorization: Bearer MY_KEY" \
  -H "X-Operation: CREATE" \
  -H 'X-JSON-Payload: {"id":1,"name":"Alice"}'

## Retrieve decrypted logs
curl -X GET http://localhost:4000/v1/logs \
  -H "Authorization: Bearer MY_KEY"
