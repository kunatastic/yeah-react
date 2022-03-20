export interface IFormFieldProps {
  closeFormCB: () => void;
  showResultsCB: (results: IFormField[]) => void;
}

export interface IFormField {
  id: number;
  label: string;
  type: string;
  value: string;
}

export interface IFieldProps {
  field: IFormField;
  onClickHandler: (id: number) => void;
  onChangeHandler: (e: any, id: number) => void;
}

export interface IFormData {
  id: number;
  title: string;
  formfields: IFormField[];
}
