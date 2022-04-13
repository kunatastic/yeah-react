// import { FormEditActions, FormPreviewActions } from "../types/actions-reducer";
import { FormEditActions } from "../types/ActionReducerTypes";
import { AcceptedKind } from "../types/CommonTypes";
import { fieldType, IFormData, inputTypes } from "../types/FormsTypes";

export function createNewFormField(
  label: string = "",
  kind: AcceptedKind,
  fieldType: fieldType,
  options: string[] = []
): inputTypes {
  switch (kind) {
    case "TEXT":
      return {
        kind: kind,
        id: new Date().getTime().toString(),
        label: label,
        fieldType: fieldType,
        value: "",
      };
    case "RADIO":
      return {
        kind: kind,
        id: new Date().getTime().toString(),
        label: label,
        fieldType: fieldType,
        value: "",
        options: options,
      };
    case "MULTISELECT":
      return {
        kind: kind,
        id: new Date().getTime().toString(),
        label: label,
        fieldType: fieldType,
        value: [],
        options: options,
      };
    default:
      return {
        kind: "TEXT",
        id: new Date().getTime().toString(),
        label: "Enter a label",
        fieldType: "text",
      };
  }
}

// Action Reducer
export function EditFormReducer(state: IFormData, action: FormEditActions): IFormData {
  switch (action.type) {
    case "ADD_FORM_FIELD":
      const newField = createNewFormField(
        action.fieldType.label,
        action.fieldType.kind,
        action.fieldType.fieldType,
        action.fieldType.kind !== "TEXT" ? action.fieldType.options : []
      );
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
          if (field.id === action.id && (field.kind === "TEXT" || field.kind === "RADIO"))
            return { ...field, value: action.value };
          return field;
        }),
      };
    case "UPDATE_FORM_VALUE_MULTIPLE":
      return {
        ...state,
        formfields: state.formfields.map((field) => {
          if (field.id === action.id && field.kind === "MULTISELECT")
            return { ...field, value: action.value };
          return field;
        }),
      };
    case "CLEAR_FORM_VALUE":
      return {
        ...state,
        formfields: state.formfields.map((field) => {
          if (field.id === action.id && (field.kind === "TEXT" || field.kind === "RADIO"))
            return { ...field, value: "" };
          else if (field.id === action.id && field.kind === "MULTISELECT")
            return { ...field, value: [] };
          return field;
        }),
      };
    default:
      return state;
  }
}
