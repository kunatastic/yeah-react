import React, { useState } from "react";
import { formFields } from "../data/FormField";
import { IFormFieldProps, IFormFields, IFormInputComponentProps } from "../types/forms";

function Form(props: IFormFieldProps) {
  const { closeFormCB, showResultsCB } = props;

  const [formField, setFormField] = useState(formFields);
  const [id, setId] = useState(6);
  const [newFieldData, setNewFieldData] = useState<string>("");

  function addNewField(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setFormField([...formField, { label: newFieldData, type: "text", id: id, value: "" }]);
    setId(id + 1);
    setNewFieldData("");
  }

  function removeField(event: React.FormEvent<HTMLButtonElement>, id: number) {
    event.preventDefault();
    const newformField = formField.filter((f) => f.id !== id);
    setFormField(newformField);
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showResultsCB(formField);
  }

  function clearFormFields(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setFormField(
      formField.map((field) => {
        return { ...field, value: "" };
      })
    );
  }

  // TODO: Types
  const onChangeHandler = (e: any) =>
    setFormField(
      formField.map((field) => {
        if (field.id === id) return { ...field, value: e.target.value };
        return field;
      })
    );

  // TODO: Types
  const onClickHandler = (e: any) => {
    removeField(e, id);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {formField.map((field, index) => (
          <FormInputComponent
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
            >
              Add New Field ➕
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full mt-5">
          <button
            className="text-white w-full bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            type="submit"
          >
            Submit ✔
          </button>
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            onClick={closeFormCB}
          >
            Home 🏠
          </button>
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            onClick={clearFormFields}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

function FormInputComponent(props: IFormInputComponentProps) {
  const { field, onClickHandler, onChangeHandler } = props;
  const { label, type, id, value } = field;
  return (
    <div className="pt-4">
      <label className="text-gray-900 font-semibold py-2">
        {id}. {label}-[{value}]
      </label>
      <div className="flex">
        <input
          className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
          type={type}
          onChange={onChangeHandler}
          value={value}
        />
        <button
          className="text-black border-2 border-transparent  hover:border-red-600 w-full bg-gray-200 mx-2 px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={onClickHandler}
        >
          Remove ❌
        </button>
      </div>
    </div>
  );
}

export default Form;
