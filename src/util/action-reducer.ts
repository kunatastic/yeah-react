import { FormActions } from "../types/actions-reducer";
import { IFormData, InputFormField, inputTypes } from "../types/forms";

export function createNewFormField(fieldType: inputTypes): InputFormField {
  console.log(fieldType);
  switch (fieldType.kind) {
    case "text":
      return {
        kind: "text",
        id: new Date().getTime().toString(),
        label: fieldType.label,
        type: fieldType.fieldType,
        value: "",
      };
    case "dropdown":
      return {
        kind: "dropdown",
        id: new Date().getTime().toString(),
        label: fieldType.label,
        type: fieldType.fieldType,
        value: "",
        options: fieldType.options,
      };
    case "multiselect":
      return {
        kind: "multiselect",
        id: new Date().getTime().toString(),
        label: fieldType.label,
        type: fieldType.fieldType,
        value: [],
        options: fieldType.options,
      };
    default:
      return {} as never;
  }
}

// Action Reducer
export function reducer(state: IFormData, action: FormActions) {
  switch (action.type) {
    case "ADD_FIELD":
      const newField = createNewFormField(action.fieldType);
      return { ...state, formfields: [...state.formfields, newField] };
    case "REMOVE_FIELD":
      return { ...state, formfields: state.formfields.filter((field) => field.id !== action.id) };
    default:
      return state;
  }
}
