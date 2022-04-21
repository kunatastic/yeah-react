import { AcceptedKind, formSubmissionValuesTypes } from "./CommonTypes";

export type formMetaDataType = {
  id: number;
  created_by: number;
  created_date: string;
  modified_date: string;
  description: string;
  is_public: boolean;
  title: string;
};

export type formFieldType = {
  count: number;
  next: null | string;
  previous: null | string;
  results: resultType[];
};

export type resultType = {
  id: string;
  kind: AcceptedKind;
  label: string;
  options?: string[];
  value?: string;
  meta: any;
};

export type submissionType = {
  answers: formSubmissionValuesTypes[];
  form: Omit<formMetaDataType, "created_by" | "created_date" | "modified_date" | "id">;
};

export type submissionResultType = {
  count: number;
  next: null | string;
  previous: null | string;
  results: customResult;
};

export type customResult = {
  id: number;
  form: resultType[];
  created_date: string;
};
