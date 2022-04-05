import { inputTypes } from "./forms";

type RemoveFormAction = { type: "REMOVE_FORM_FIELD"; id: string };
type AddFormAction = { type: "ADD_FORM_FIELD"; fieldType: inputTypes };
type UpdateFormTitleAction = { type: "UPDATE_FORM_TITLE"; title: string };
type UpdateFormAmbianceColorAction = { type: "UPDATE_FORM_AMBIANCE_COLOR"; color: string };
type UpdateFormLabelAction = { type: "UPDATE_FORM_LABEL"; id: string; label: string };

export type FormEditActions =
  | AddFormAction
  | RemoveFormAction
  | UpdateFormTitleAction
  | UpdateFormAmbianceColorAction
  | UpdateFormLabelAction;

type UpdateFormValueAction = { type: "UPDATE_FORM_VALUE"; id: string; value: string | string[] };
type ClearFormValueAction = { type: "CLEAR_FORM_VALUE"; id: string };
export type FormPreviewActions = UpdateFormValueAction | ClearFormValueAction;
