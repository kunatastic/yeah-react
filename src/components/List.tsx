import React, { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../config";
import { formFields as initialFormField } from "../data/FormField";
import { IFormData } from "../types/forms";

function saveLocalData(currentState: IFormData[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
}

function getLocalForms(): IFormData[] {
  const stringifiedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stringifiedFormData ? JSON.parse(stringifiedFormData) : [];
}

//! Get the Form Data from LocalStorage or return default value
function initialFormData(): IFormData[] {
  const localForms = getLocalForms();
  return localForms;
}

function List(props: { loadFormCB: (formData: IFormData) => void }) {
  const [allFormData, setAllFormData] = useState<IFormData[]>(initialFormData);
  // const [data, setData] = useState<Number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  useEffect(() => {
    setAllFormData(() => initialFormData());
  }, []);

  function deleteFormData(form: IFormData) {
    saveLocalData(allFormData.filter((data) => data.id !== form.id));
    setAllFormData(allFormData.filter((data) => data.id !== form.id));
  }

  function addNewForm() {
    const newform: IFormData = {
      id: Number(new Date()),
      title: "Untitled",
      formfields: initialFormField,
    };
    saveLocalData([...allFormData, newform]);
    props.loadFormCB(newform);
  }

  return (
    <div className="grid grid-cols-2 self-center gap-4">
      {console.log(allFormData.length)}
      {allFormData.map((form, index) => {
        return (
          <div
            key={index}
            className="max-w-xl p-4 bg-blue-100 rounded-md shadow-xl hover:shadow-md hover:bg-blue-200"
          >
            <h1 className="text-xl font-semibold">
              {index + 1}.) {form.title}
            </h1>
            <div className="flex justify-between mt-5">
              <button
                className="text-white bg-blue-500  w-20 hover:bg-blue-600 border border-transparent hover:border-black"
                onClick={() => deleteFormData(form)}
                type="button"
              >
                Delete
              </button>
              <button
                className="text-white bg-blue-500  w-20 hover:bg-blue-600 border border-transparent hover:border-black"
                onClick={() => props.loadFormCB(form)}
                type="button"
              >
                Visit
              </button>
            </div>
          </div>
        );
      })}
      <div className="w-full p-4 bg-gray-100 rounded-md shadow-xl hover:shadow-md hover:bg-gray-200">
        <h1 className="text-xl font-semibold">New Form</h1>
        <div className="flex justify-between mt-5">
          <button
            className="text-white bg-blue-500 w-full hover:bg-blue-600 border border-transparent hover:border-black"
            onClick={addNewForm}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;
