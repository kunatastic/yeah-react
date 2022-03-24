export interface IFormFieldProps {
  formId: string;
}

export interface IFormField {
  id: string;
  label: string;
  type: string;
  value: string;
}

// export interface IFieldProps {
//   field: IFormField;
//   onClickHandler?: (id: string) => void;
//   onChangeHandler: (e: any, id: string) => void;
//   preview: boolean;
// }

export interface IFormData {
  id: string;
  title: string;
  formfields: IFormField[];
}

type editFieldProps = {
  preview: false;
  label: string;
  onClickHandler: (id: string) => void;
  onLabelChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  id: string;
  type: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

type previewFieldProps = {
  preview: true;
  label: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  id: string;
  value: string;
  type: string;
};

export type IFieldProps = editFieldProps | previewFieldProps;
