import { InputFormField, inputTypes } from "../types/forms";

export function createNewFormField(fieldType: inputTypes): InputFormField {
  console.log(fieldType);
  switch (fieldType.kind) {
    case "text":
      return {
        kind: "text",
        id: new Date().getTime().toString(),
        label: fieldType.label,
        value: "",
        type: fieldType.fieldType,
      };
    case "dropdown":
      return {
        kind: "dropdown",
        id: new Date().getTime().toString(),
        label: fieldType.label,
        value: "",
        options: fieldType.options,
        type: fieldType.fieldType,
      };
    case "multiselect":
      return {
        kind: "multiselect",
        id: new Date().getTime().toString(),
        label: fieldType.label,
        value: [],
        options: fieldType.options,
        type: fieldType.fieldType,
      };
    default:
      return {} as never;
  }
}
