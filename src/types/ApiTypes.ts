import { AcceptedKind } from "./CommonTypes";

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
