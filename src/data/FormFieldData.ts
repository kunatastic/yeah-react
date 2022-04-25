import { inputTypes } from "../types/FormsTypes";

export const formFields: inputTypes[] = [
  {
    kind: "TEXT",
    fieldType: "text",
    id: "firstName",
    value: "",
    label: "First Name",
  },
  {
    kind: "TEXT",
    fieldType: "text",
    id: "lastName",
    value: "",
    label: "Last Name",
  },
  {
    kind: "TEXT",
    fieldType: "email",
    id: "email",
    value: "",
    label: "Email",
  },
  {
    kind: "TEXT",
    fieldType: "number",
    id: "age",
    value: "",
    label: "Age",
  },
  {
    kind: "RADIO",
    fieldType: "radio",
    id: "gender",
    options: ["Male", "Female", "Others"],
    label: "Gender",
    value: "",
  },
  {
    kind: "RADIO",
    fieldType: "single",
    id: "income",
    options: ["<100k", ">=100k && <250k", ">=250k"],
    label: "Income",
    value: "",
  },
  {
    kind: "DROPDOWN",
    fieldType: "checkbox",
    id: "interest",
    options: ["Sleeping", "Reading", "Singing", "Coding"],
    label: "Interest",
    value: "",
  },
  {
    kind: "DROPDOWN",
    fieldType: "multiple",
    id: "languages",
    options: ["English", "Hindi", "Tamil", "Telugu"],
    label: "Languages",
    value: "",
  },
];
