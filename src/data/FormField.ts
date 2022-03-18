export interface IFormFields {
  id: number;
  label: string;
  type: string;
}

export const formFields: IFormFields[] = [
  {
    id: 1,
    label: "First Name",
    type: "text",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
  },
  {
    id: 4,
    label: "Phone",
    type: "tel",
  },
  {
    id: 5,
    label: "Date of Birth",
    type: "date",
  },
];
