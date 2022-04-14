import { API_BASE_URL } from "../config";
import { PaginationParams } from "../types/CommonTypes";
import { formMetaType, inputTypes } from "../types/FormsTypes";

type RequestMethodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export async function request(endpoint: string, method: RequestMethodType = "GET", data: any = {}) {
  let url;
  let payload;

  // GET request
  if (method === "GET") {
    const requestParameters = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParameters}`;
    payload = null;
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : null;
  }

  // BASIC AUTHENTICATION
  // const auth = "Basic " + window.btoa(API_CREDENTIALS);

  // TOKEN AUTHENTICATION
  const token = localStorage.getItem("token");
  const auth = token ? `Token ${token}` : "";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: payload,
    });

    if (response.ok) {
      if (method === "DELETE") return true;
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      throw Error(errorJson);
    }
  } catch (error) {
    return error;
  }
}

export async function me() {
  return request("users/me/");
}

export async function login(username: string, password: string) {
  return request("auth-token/", "POST", { username, password });
}

export async function createForm(form: formMetaType) {
  return request("forms/", "POST", form);
}

export async function listForm(pageParams: PaginationParams) {
  return request("forms/", "GET", pageParams);
}

export async function getFormMetaData(formId: string) {
  return request(`forms/${formId}/`);
}

export async function patchFormMetaData(formId: string, form: formMetaType) {
  return request(`forms/${formId}/`, "PATCH", form);
}

export async function deleteForm(formId: string) {
  return request(`forms/${formId}/`, "DELETE");
}

export async function getFormFields(formId: string) {
  return request(`forms/${formId}/fields/`);
}

export async function addField(formId: string, field: inputTypes) {
  const payload = {
    label: field.label,
    kind: field.kind,
    options: field.kind !== "TEXT" ? field.options : null,
    meta: {
      value: field.value,
      fieldType: field.fieldType,
    },
  };
  return request(`forms/${formId}/fields/`, "POST", payload);
}

export async function updateField(formId: string, fieldId: string, field: inputTypes) {
  const payload = {
    label: field.label,
    kind: field.kind,
    options: field.kind !== "TEXT" ? field.options : null,
    meta: {
      value: field.value,
      fieldType: field.fieldType,
    },
  };
  return request(`forms/${formId}/fields/${fieldId}/`, "PUT", payload);
}

export async function removeField(formId: string, fieldId: string) {
  return request(`forms/${formId}/fields/${fieldId}/`, "DELETE");
}

export async function getOptions(formId: string, fieldId: string) {
  return request(`forms/${formId}/fields/${fieldId}/options/`, "GET");
}

export async function addOption(formId: string, fieldId: string, option: any) {
  return request(`forms/${formId}/fields/${fieldId}/options/`, "POST", option);
}

export async function updateOption(formId: string, fieldId: string, optionId: string, option: any) {
  return request(`forms/${formId}/fields/${fieldId}/options/${optionId}/`, "PUT", option);
}

export async function removeOption(formId: string, fieldId: string, optionId: string) {
  return request(`forms/${formId}/fields/${fieldId}/options/${optionId}/`, "DELETE");
}
