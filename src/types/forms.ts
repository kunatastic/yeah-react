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

export interface IFormInputComponentProps {
  field: IFormFields;
  onClickHandler: (e: any) => void;
  onChangeHandler: (e: any) => void;
}
