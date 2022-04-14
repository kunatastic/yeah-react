import { AcceptedKind } from "./CommonTypes";

export interface IFormData {
  id: string;
  title: string;
  color?: string;
  formfields: inputTypes[];
}

type textFieldType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "tel"
  | "color"
  | "date"
  | "datetime-local";

type radioFieldTypes = "single" | "radio";

type multiSelectFieldType = "multiple" | "checkbox";

export type fieldType = textFieldType | radioFieldTypes | multiSelectFieldType;

type textInputTypes = {
  kind: "TEXT";
  id: string;
  label: string;
  value?: string;
  fieldType: fieldType;
};

type radioInputTypes = {
  id: string;
  value?: string;
  kind: "RADIO";
  fieldType: fieldType;
  label: string;
  options: string[];
};

type multiSelectInputTypes = {
  id: string;
  value?: string[];
  kind: "DROPDOWN";
  fieldType: fieldType;
  label: string;
  options: string[];
};

export type inputTypes = textInputTypes | radioInputTypes | multiSelectInputTypes;

export type InputFormProps = {
  onChangeHandler: (value: string | string[], id: string, kind: AcceptedKind) => void;
  field: inputTypes;
};

export type formMetaType = {
  id?: string;
  title: string;
  description?: string;
  is_public: boolean;
};

export type Error<T> = Partial<Record<keyof T, string>>;
