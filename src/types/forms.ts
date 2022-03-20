export interface IFormFieldProps {
  changeStateCB: (state: string) => void;
  showResultsCB: (results: IFormField[]) => void;
  initialLoadedData: IFormData;
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
