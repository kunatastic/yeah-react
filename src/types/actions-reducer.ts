import { inputTypes } from "./forms";

type RemoveFormAction = {
  type: "REMOVE_FIELD";
  id: string;
};

type AddFormAction = {
  type: "ADD_FIELD";
  fieldType: inputTypes;
};

export type FormActions = AddFormAction | RemoveFormAction;
