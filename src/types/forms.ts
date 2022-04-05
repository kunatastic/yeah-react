export interface IFormFieldProps {
  formId: string;
}

export interface IFormData {
  id: string;
  title: string;
  color: string;
  formfields: InputFormField[];
}

type editFieldProps = {
  preview: false;
  field: InputFormField;
  onClickHandler: (id: string) => void;
  onLabelChangeHandler: (label: string, id: string) => void;
};

type previewFieldProps = {
  preview: true;
  field: InputFormField;
  onChangeHandler: (
    value: string | string[],
    id: string,
    kind: "text" | "dropdown" | "multiselect"
  ) => void;
};

export type IFieldProps = editFieldProps | previewFieldProps;

type textFieldType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "tel"
  | "color"
  | "date"
  | "datetime-local";

type TextField = {
  kind: "text";
  type: textFieldType;
  id: string;
  value: string;
  label: string;
};

type dropdownFieldType = "single" | "radio";
type DropDownField = {
  kind: "dropdown";
  type: dropdownFieldType;
  id: string;
  value: string;
  label: string;
  options: string[];
};

type multiSelectFieldType = "multiple" | "checkbox";
type MultiSelectField = {
  kind: "multiselect";
  type: multiSelectFieldType;
  id: string;
  value: string[];
  label: string;
  options: string[];
};

export type InputFormField = TextField | DropDownField | MultiSelectField;

type textInputTypes = {
  kind: "text";
  fieldType: textFieldType;
  label: string;
};

type dropDownInputTypes = {
  kind: "dropdown";
  fieldType: dropdownFieldType;
  label: string;
  options: string[];
};

type multiSelectInputTypes = {
  kind: "multiselect";
  fieldType: multiSelectFieldType;
  label: string;
  options: string[];
};

type nullInputTypes = {
  kind: "null";
  fieldType: "null";
  label: string;
  options?: string[];
};

export type inputTypes =
  | textInputTypes
  | dropDownInputTypes
  | multiSelectInputTypes
  | nullInputTypes;

export type InputFormProps = {
  onChangeHandler: (
    value: string | string[],
    id: string,
    kind: "text" | "dropdown" | "multiselect"
  ) => void;
  field: InputFormField;
};
