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
  onLabelChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

type previewFieldProps = {
  preview: true;
  field: InputFormField;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: string) => void;
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
};

type dropDownInputTypes = {
  kind: "dropdown";
  fieldType: dropdownFieldType;
};

type multiSelectInputTypes = {
  kind: "multiselect";
  fieldType: multiSelectFieldType;
};

type nullInputTypes = {
  kind: "null";
  fieldType: "null";
};

export type inputTypes =
  | textInputTypes
  | dropDownInputTypes
  | multiSelectInputTypes
  | nullInputTypes;
