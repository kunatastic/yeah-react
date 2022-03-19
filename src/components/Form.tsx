import React, { useEffect, useState } from "react";
import { formFields as initialFormField } from "../data/FormField";
import { IFormFieldProps, IFormFields } from "../types/forms";
import Fields from "./Fields";

function Form(props: IFormFieldProps) {
  const { closeFormCB, showResultsCB } = props;

  const [formField, setFormField] = useState<IFormFields[]>(initialFormData());
  const [id, setId] = useState(6);
  const [newFieldData, setNewFieldData] = useState<string>("");

  useEffect(() => {
    console.log("UseEffect hook loaded");
    document.title = "Awesome Form Editor";

    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // saveFormData(,formField);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [formField]);

  function addNewField(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setFormField([...formField, { label: newFieldData, type: "text", id: id, value: "" }]);
    setId(id + 1);
    setNewFieldData("");
  }

  function removeField(id: number) {
    const newformField = formField.filter((f) => f.id !== id);
    setFormField(newformField);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showResultsCB(formField);
  }

  function clearFormFields() {
    setFormField(
      formField.map((field) => {
        return { ...field, value: "" };
      })
    );
  }

  // TODO: Types
  function onChangeHandler(e: any, id: number) {
    setFormField(
      formField.map((field) => {
        if (field.id === id) return { ...field, value: e.target.value };
        return field;
      })
    );
  }

  // TODO: Types
  function onClickHandler(id: number) {
    removeField(id);
  }

  // TODO: types
  function saveFormData(event: any, currentState: IFormFields[]) {
    event.preventDefault();
    localStorage.setItem("kunal-react-form-data", JSON.stringify(currentState));
    console.log("DATA SET SUCCESFULLY");
  }

  function initialFormData(): IFormFields[] {
    const stringifiedFormData = localStorage.getItem("kunal-react-form-data");
    const formData = stringifiedFormData ? JSON.parse(stringifiedFormData) : initialFormField;
    return formData;
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {formField.map((field, index) => (
          <Fields
            key={index}
            field={field}
            onChangeHandler={onChangeHandler}
            onClickHandler={onClickHandler}
          />
        ))}

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
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            type="submit"
          >
            Submit ✔
          </button>
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
            onClick={closeFormCB}
            type="button"
          >
            Home 🏠
          </button>
        </div>
        <div className="flex justify-between w-full mt-5">
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
            onClick={clearFormFields}
            type="button"
          >
            Cancel ✖
          </button>
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            onClick={(e) => saveFormData(e, formField)}
          >
            Cancel ✖
          </button>
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            onClick={(e) => saveFormData(e, formField)}
          >
            Save 💾
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
