export interface IFormFieldProps {
  formId: string;
}

export interface IFormField {
  id: string;
  label: string;
  type: string;
  value: string;
}

export interface IFieldProps {
  field: IFormField;
  onClickHandler?: (id: string) => void;
  onChangeHandler: (e: any, id: string) => void;
  preview: boolean;
}

export interface IFormData {
  id: string;
  title: string;
  formfields: IFormField[];
}
