import { Link, navigate } from "raviger";
import React, { useEffect, useState, useRef } from "react";
import { formFields as initialFormField } from "../data/FormField";
import { IFormData, IFormFieldProps } from "../types/forms";
import Fields from "./Fields";

const LOCAL_STORAGE_KEY = "kunal-react-form-data";

//! Save the Form Data to LocalStorage
function saveFormData(currentState: IFormData) {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) => {
    return form.id === currentState.id ? currentState : form;
  });
  saveLocalData(updatedLocalForms);
}

function saveLocalData(currentState: IFormData[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
}

function getLocalForms(): IFormData[] {
  const stringifiedFormData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stringifiedFormData ? JSON.parse(stringifiedFormData) : [];
}

//! Get the Form Data from LocalStorage or return default value
// TODO: ADD a custom redirect to `/link` if the formId doesn't exist in the LocalStorage
function getInitialFormData(formId: string): IFormData {
  console.log("YWSSSS");
  const localForms = getLocalForms();
  const formData = localForms.find((form) => form.id === formId);
  const newFormData = {
    id: new Date().getTime().toString(36),
    title: "",
    formfields: initialFormField,
  };
  if (formData) return formData;

  navigate("/form-do-not-exist", { replace: true });
  return newFormData;
}

function Form(props: IFormFieldProps): JSX.Element {
  const { formId } = props;

  const [formField, setFormField] = useState<IFormData>(() => getInitialFormData(formId));
  const [newFieldData, setNewFieldData] = useState<string>("");

  const titleRef = useRef<HTMLInputElement>(null);

  //! Change the title of document if the Form component is rendered
  useEffect(() => {
    document.title = formField.title;
    titleRef.current?.focus();

    //? Cleanup the useEffect hook on unmount of the Form Component
    return () => {
      document.title = "React App";
    };
  }, [formField.title]);

  //! Save the Form Data to LocalStorage on every change
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(formField);
    }, 1000);

    //? Clean timeout on every change of the Form Data
    return () => {
      clearTimeout(timeout);
    };
  }, [formField]);

  //! Add a new Field to the Form
  function addNewField() {
    setFormField({
      ...formField,
      formfields: [
        ...formField.formfields,
        {
          id: new Date().getTime().toString(36),
          label: newFieldData,
          type: "text",
          value: "",
        },
      ],
    });
    setNewFieldData("");
  }

  //! Remove a Field from the Form
  function removeField(id: string) {
    setFormField({
      ...formField,
      formfields: formField.formfields.filter((field) => field.id !== id),
    });
  }

  // TODO: Redirect to `/result/:formId` on the click of the `Submit` button
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // showResultsCB(formField.formfields);
    navigate(`/result/${formId}`);
  }

  //! Clear all the fields from the Form
  function clearFormFields() {
    setFormField({
      ...formField,
      formfields: formField.formfields.map((field) => {
        return {
          ...field,
          value: "",
        };
      }),
    });
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    setFormField({
      ...formField,
      formfields: formField.formfields.map((field) => {
        if (field.id === id) return { ...field, value: e.target.value };
        return field;
      }),
    });
  }

  function onClickHandler(id: string) {
    removeField(id);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="flex gap-2 bg-blue-200 py-2 px-4 rounded-xl">
          <label className="text-gray-900 font-semibold py-2">Form Name: </label>
          <input
            className="w-full px-4 py-2 border-2 rounded-lg flex-1 focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            type="text"
            onChange={(e) =>
              setFormField({
                ...formField,
                title: e.target.value,
              })
            }
            ref={titleRef}
            value={formField.title}
          />
        </div>

        {formField.formfields.map((field, index) => {
          return (
            <Fields
              key={index}
              field={field}
              onChangeHandler={onChangeHandler}
              onClickHandler={onClickHandler}
            />
          );
        })}

        <div className="pt-4">
          <label className="text-gray-900 font-semibold py-2">Add Field</label>
          <div className="flex">
            <input
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
              type="text"
              onChange={(e) => setNewFieldData(e.target.value)}
              value={newFieldData}
            />
            <button
              className="text-white w-full bg-gray-500 mx-2 px-4 py-2 border-2 border-transparent  hover:border-green-500 rounded-lg hover:bg-gray-600"
              onClick={addNewField}
              type="button"
            >
              Add New Field ➕
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full mt-5">
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            type="submit"
          >
            Submit ✔
          </button>
          <Link
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
            // onClick={() => changeStateCB("HOME")}
            type="button"
            href="/"
          >
            Home 🏠
          </Link>
        </div>
        <div className="flex justify-between w-full mt-5">
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
            onClick={clearFormFields}
            type="button"
          >
            Clear ✖
          </button>
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            onClick={() => saveFormData(formField)}
            type="button"
          >
            Save 💾
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
