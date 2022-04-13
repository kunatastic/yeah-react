import { inputTypes } from "./FormsTypes";

export type Pagination<T> = {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
};

export type PaginationParams = {
  offset: number;
  limit: number;
};

export type editFieldProps = {
  field: inputTypes;
  onClickHandler: (id: string) => void;
  onLabelChangeHandler: (label: string, id: string) => void;
};

export type AcceptedKind = "TEXT" | "RADIO" | "MULTISELECT";

export type previewFieldProps = {
  field: inputTypes;
  onChangeHandler: (value: string | string[], id: string, kind: AcceptedKind) => void;
};
