import Ajv from "ajv";
const ajv = new Ajv();

export function validateJSON(schema, data) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  return { valid, errors: validate.errors || [] };
}
