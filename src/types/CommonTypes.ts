import { resultType } from "./ApiTypes";

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
  field: resultType;
  value: formSubmissionValuesTypes;
  onChangeHandler: (value: string, id: string) => void;
};

export type formSubmissionValuesTypes = {
  form_field: string;
  value: string;
};
