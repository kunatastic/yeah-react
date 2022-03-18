export interface IFormFields {
  label: string;
  type: string;
  data: string;
}

export const FormFields: IFormFields[] = [
  {
    label: "First Name",
    type: "text",
    data: "Kunal",
  },
  {
    label: "Last Name",
    type: "text",
    data: "Kumar",
  },
  {
    label: "Email",
    type: "email",
    data: "kunal@kunatastic.me",
  },
  {
    label: "Phone",
    type: "tel",
    data: "+91-9888888888",
  },
  {
    label: "Date of Birth",
    type: "date",
    data: "",
  },
];
