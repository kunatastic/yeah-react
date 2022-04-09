import { InputFormField, inputTypes } from "../types/FormsTypes";

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

export const formFieldOptions: { groupName: string; inputOptions: inputTypes[] }[] = [
  {
    groupName: "Text",
    inputOptions: [
      { kind: "text", fieldType: "text", label: "" },
      { kind: "text", fieldType: "email", label: "" },
      { kind: "text", fieldType: "tel", label: "" },
      { kind: "text", fieldType: "number", label: "" },
      { kind: "text", fieldType: "color", label: "" },
      { kind: "text", fieldType: "date", label: "" },
      { kind: "text", fieldType: "datetime-local", label: "" },
    ],
  },
  {
    groupName: "Dropdown",
    inputOptions: [
      { kind: "dropdown", fieldType: "single", label: "", options: [] },
      { kind: "multiselect", fieldType: "multiple", label: "", options: [] },
    ],
  },
  {
    groupName: "Radio",
    inputOptions: [
      { kind: "dropdown", fieldType: "radio", label: "", options: [] },
      { kind: "multiselect", fieldType: "checkbox", label: "", options: [] },
    ],
  },
];
