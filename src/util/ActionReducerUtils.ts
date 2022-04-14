// import { FormEditActions, FormPreviewActions } from "../types/actions-reducer";
import { FormEditActions } from "../types/ActionReducerTypes";
import { AcceptedKind } from "../types/CommonTypes";
import { fieldType, IFormData, inputTypes } from "../types/FormsTypes";

export function createNewFormField(
  id: string,
  label: string = "",
  kind: AcceptedKind,
  fieldType: fieldType,
  options: string[]
): inputTypes {
  switch (kind) {
    case "TEXT":
      return {
        kind: kind,
        id: id,
        label: label,
        fieldType: fieldType,
        value: "",
      };
    case "RADIO":
      return {
        kind: kind,
        id: id,
        label: label,
        fieldType: fieldType,
        value: "",
        options: options,
      };
    case "DROPDOWN":
      return {
        kind: kind,
        id: id,
        label: label,
        fieldType: fieldType,
        value: "",
        options: options,
      };
    default:
      return {
        kind: "TEXT",
        id: id,
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
        new Date().getTime().toString(),
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
