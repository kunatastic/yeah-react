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
  results: any[];
};
