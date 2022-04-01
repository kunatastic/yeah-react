import { InputFormField, inputTypes } from "../types/forms";

export const formFields: InputFormField[] = [
  {
    kind: "text",
    type: "text",
    id: "firstName",
    value: "",
    label: "First Name",
  },
  {
    kind: "text",
    type: "text",
    id: "lastName",
    value: "",
    label: "Last Name",
  },
  {
    kind: "text",
    type: "email",
    id: "email",
    value: "",
    label: "Email",
  },
  {
    kind: "text",
    type: "number",
    id: "age",
    value: "",
    label: "Age",
  },
  {
    kind: "dropdown",
    type: "radio",
    id: "gender",
    options: ["Male", "Female", "Others"],
    label: "Gender",
    value: "",
  },
  {
    kind: "dropdown",
    type: "single",
    id: "income",
    options: ["<100k", ">=100k && <250k", ">=250k"],
    label: "Income",
    value: "",
  },
  {
    kind: "multiselect",
    type: "checkbox",
    id: "interest",
    options: ["Sleeping", "Reading", "Singing", "Coding"],
    label: "Interest",
    value: [],
  },
  {
    kind: "multiselect",
    type: "multiple",
    id: "languages",
    options: ["English", "Hindi", "Tamil", "Telugu"],
    label: "Languages",
    value: [],
  },
];

export const formFieldOptions: {
  groupName: string;
  inputOptions: inputTypes[];
}[] = [
  {
    groupName: "Text",
    inputOptions: [
      { kind: "text", fieldType: "text" },
      { kind: "text", fieldType: "email" },
      { kind: "text", fieldType: "tel" },
    ],
  },
  {
    groupName: "Dropdown",
    inputOptions: [
      { kind: "dropdown", fieldType: "single" },
      { kind: "multiselect", fieldType: "multiple" },
    ],
  },
  {
    groupName: "Radio",
    inputOptions: [
      { kind: "dropdown", fieldType: "radio" },
      { kind: "multiselect", fieldType: "checkbox" },
    ],
  },
];
