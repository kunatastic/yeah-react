export interface IFormField {
  closeFormCB: () => void;
  showResultsCB: (results: IFormFieldData) => void;
}

export interface IFormFieldData {
  [key: string]: string;
}
