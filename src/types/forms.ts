export interface IFormFieldProps {
  closeFormCB: () => void;
  showResultsCB: (results: IFormFields[]) => void;
}

export interface IFormFields {
  id: number;
  label: string;
  type: string;
  value: string;
}

export interface IFieldProps {
  field: IFormFields;
  onClickHandler: (e: any, id: number) => void;
  onChangeHandler: (e: any, id: number) => void;
}
