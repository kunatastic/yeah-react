export interface IFormFieldProps {
  formId: string;
}

export interface IFormField {
  id: string;
  label: string;
  type: string;
  value: string;
}

export interface IFormData {
  id: string;
  title: string;
  formfields: IFormField[];
}

type editFieldProps = {
  preview: false;
  id: string;
  type: string;
  label: string;
  // field: InputFormField;
  onClickHandler: (id: string) => void;
  onLabelChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

type previewFieldProps = {
  preview: true;
  id: string;
  type: string;
  label: string;
  value: string;
  // field: InputFormField;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

export type IFieldProps = editFieldProps | previewFieldProps;

type textFieldType = "text" | "email" | "number" | "password" | "tel";

type TextField = {
  type: textFieldType;
  kind: "text";
  id: string;
  value: string;
  label: string;
};

type dropdownFieldType = "single" | "multiple" | "radio" | "checkbox";

type DropDownField = {
  type: dropdownFieldType;
  kind: "dropdown";
  id: string;
  value: string;
  label: string;
  options: string[];
};

export type InputFormField = TextField | DropDownField;
