import { generateJSONSchema } from "../src/services/formGenerator.js";

test("generate schema from simple JSON", () => {
  const json = { name: "Alice", age: 25 };
  const schema = generateJSONSchema(json);
  expect(schema.properties.name.type).toBe("string");
  expect(schema.properties.age.type).toBe("number");
});
