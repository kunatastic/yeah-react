import { Link } from "raviger";
import React, { useState } from "react";
import { LOCAL_STORAGE_KEY } from "../config";
import { IFormData } from "../types/forms";

function Result(props: { formId: string }) {
  const { formId } = props;
  const [results, setResults] = useState<IFormData>(() => getInitialFormData(formId));

  function getLocalForms(): IFormData[] {
    const stringifiedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stringifiedFormData ? JSON.parse(stringifiedFormData) : [];
  }

  //! Get the Form Data from LocalStorage or return default value
  // TODO: ADD a custom redirect to `/link` if the formId doesn't exist in the LocalStorage
  function getInitialFormData(formId: string): IFormData {
    const localForms = getLocalForms();
    const formData = localForms.find((form) => form.id === formId);
    return formData ? formData : ({} as IFormData);
  }

  return (
    <div>
      <h1 className="text-3xl py-4">Result</h1>
      <h1 className="text-gray-500">Id. Label and data</h1>

      {results.formfields.map((result, index) => {
        const { value, label } = result;
        return (
          <div key={index} className="my-2 bg-blue-300 px-5 py-2 hover:bg-blue-400">
            <span className="font-bold">
              {index + 1}. {label}
            </span>{" "}
            <span>{value}</span>
          </div>
        );
      })}
      <div className="flex justify-between w-full mt-5">
        <Link
          className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
          // onClick={() => changeStateCB("HOME")}
          type="button"
          href="/"
        >
          Home 🏠
        </Link>
        <Link
          className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
          // onClick={() => changeStateCB("HOME")}
          type="button"
          href={`/form/${formId}`}
        >
          Form 📑
        </Link>
      </div>
    </div>
  );
}

export default Result;
