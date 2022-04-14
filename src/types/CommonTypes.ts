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

export type AcceptedKind = "TEXT" | "RADIO" | "DROPDOWN";

export type previewFieldProps = {
  field: inputTypes;
  onChangeHandler: (value: string | string[], id: string, kind: AcceptedKind) => void;
};
