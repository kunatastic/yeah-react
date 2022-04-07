// import { FormEditActions, FormPreviewActions } from "../types/actions-reducer";
import { FormEditActions } from "../types/actions-reducer";
import { IFormData, InputFormField, inputTypes } from "../types/forms";

export function createNewFormField(fieldType: inputTypes): InputFormField {
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
export function EditFormReducer(state: IFormData, action: FormEditActions): IFormData {
  switch (action.type) {
    case "ADD_FORM_FIELD":
      const newField = createNewFormField(action.fieldType);
      return { ...state, formfields: [...state.formfields, newField] };
    case "REMOVE_FORM_FIELD":
      return { ...state, formfields: state.formfields.filter((field) => field.id !== action.id) };
    case "UPDATE_FORM_TITLE":
      return { ...state, title: action.title };
    case "UPDATE_FORM_AMBIANCE_COLOR":
      return { ...state, color: action.color };
    case "UPDATE_FORM_LABEL":
      return {
        ...state,
        formfields: state.formfields.map((field) => {
          if (field.id === action.id) return { ...field, label: action.label };
          return field;
        }),
      };
    default:
      return state;
  }
}

type UpdateFormValueActionSingle = { type: "UPDATE_FORM_VALUE_SINGLE"; id: string; value: string };
type UpdateFormValueActionMultiple = {
  type: "UPDATE_FORM_VALUE_MULTIPLE";
  id: string;
  value: string[];
};
type ClearFormValueAction = { type: "CLEAR_FORM_VALUE"; id: string };
export type FormPreviewActions =
  | UpdateFormValueActionSingle
  | UpdateFormValueActionMultiple
  | ClearFormValueAction;

export function PreviewFormReducer(state: IFormData, action: FormPreviewActions): IFormData {
  switch (action.type) {
    case "UPDATE_FORM_VALUE_SINGLE":
      return {
        ...state,
        formfields: state.formfields.map((field) => {
          if (field.id === action.id && (field.kind === "text" || field.kind === "dropdown"))
            return { ...field, value: action.value };
          return field;
        }),
      };
    case "UPDATE_FORM_VALUE_MULTIPLE":
      return {
        ...state,
        formfields: state.formfields.map((field) => {
          if (field.id === action.id && field.kind === "multiselect")
            return { ...field, value: action.value };
          return field;
        }),
      };
    case "CLEAR_FORM_VALUE":
      return {
        ...state,
        formfields: state.formfields.map((field) => {
          if (field.id === action.id && (field.kind === "text" || field.kind === "dropdown"))
            return { ...field, value: "" };
          else if (field.id === action.id && field.kind === "multiselect")
            return { ...field, value: [] };
          return field;
        }),
      };
    default:
      return state;
  }
}
