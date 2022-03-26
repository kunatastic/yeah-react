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
