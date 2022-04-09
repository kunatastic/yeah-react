import { API_BASE_URL, API_CREDENTIALS } from "../config";
import { dummyForm } from "../types/FormsTypes";

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

  const auth = "Basic " + window.btoa(API_CREDENTIALS);
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

export async function createForm(form: dummyForm) {
  return request("forms/", "POST", form);
}

export async function me() {
  return request("user/me/");
}
