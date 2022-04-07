import { navigate } from "raviger";
import { LOCAL_STORAGE_KEY } from "../config";
import { IFormData } from "../types/forms";

//! Save the Form Data to LocalStorage
export function saveFormData(currentState: IFormData) {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) => {
    return form.id === currentState.id ? currentState : form;
  });
  saveLocalData(updatedLocalForms);
}

export function saveLocalData(currentState: IFormData[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
}

export function getLocalForms(): IFormData[] {
  const stringifiedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stringifiedFormData ? JSON.parse(stringifiedFormData) : [];
}

//! Get the Form Data from LocalStorage or return default value
export function getInitialFormData(formId: string): IFormData {
  const localForms = getLocalForms();
  const formData = localForms.find((form) => form.id === formId);
  if (formData) return formData;
  navigate("/form-do-not-exist", { replace: true });
  return {} as never;
}
