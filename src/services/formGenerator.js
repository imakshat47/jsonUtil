const cssFrameworks = {
  none: {
    formGroup: "form-group",   // wrapper div
    fieldset: "form-section",
    legend: "section-title",
    label: "form-label",
    input: "input-field"
  },
  bootstrap: {
    formGroup: "mb-3",
    fieldset: "border p-3 mb-3",
    legend: "fw-bold mb-2",
    label: "form-label",
    input: "form-control"
  },
  materialize: {
    formGroup: "input-field",
    fieldset: "card-panel",
    legend: "card-title",
    label: "active",
    input: "validate"
  }
};

export function generateHTMLForm(json, parentKey = "", framework = "none") {
  const css = cssFrameworks[framework] || cssFrameworks.none;
  let html = "";

  if (typeof json === "object" && json !== null) {
    html += `<fieldset class="${css.fieldset}">`;

    if (json.name && json.name.value) {
      html += `<legend class="${css.legend}">${json.name.value}</legend>`;
    }

    for (const key in json) {
      if (typeof json[key] === "object") {
        html += generateHTMLForm(json[key], key, framework);
      } else {
        const inputId = `${parentKey}_${key}`;
        html += `
          <div class="${css.formGroup}" id="field-${key}">
            <label for="${inputId}" class="${css.label}">
              ${key}:
            </label>
            <input id="${inputId}" class="${css.input}" name="${parentKey}.${key}" value="${json[key]}"/>
          </div>
        `;
      }
    }
    html += "</fieldset>";
  }
  return html;
}

export function generateJSONSchema(json) {
  const schema = { type: "object", properties: {} };

  function recurse(obj, schemaNode) {
    if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          schemaNode.properties[key] = { type: "object", properties: {} };
          recurse(obj[key], schemaNode.properties[key]);
        } else {
          schemaNode.properties[key] = { type: typeof obj[key] };
        }
      }
    }
  }

  recurse(json, schema);
  return schema;
}