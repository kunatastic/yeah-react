import React, { useState } from "react";
import { formFields } from "../data/FormField";
import { IFormField, IFormFieldData } from "../types/forms";

function Form(props: IFormField) {
  const { closeFormCB, showResultsCB } = props;

  const [formField, setFormField] = useState(formFields);
  const [formFieldData, setFormFeildData] = useState<IFormFieldData>({});
  const [id, setId] = useState(6);
  const [newFieldData, setNewFieldData] = useState<string>("");

  function addNewField() {
    setNewFieldData("");
    setFormField([...formField, { label: newFieldData, type: "text", id: id }]);
    setId(id + 1);
  }

  function removeField(id: number) {
    const newformField = formField.filter((f) => f.id !== id);
    setFormField(newformField);
  }

  function handleFormSubmit() {
    showResultsCB(formFieldData);
  }

  return (
    <>
      {console.log("=============== NEW ITERATIONS ==========")}
      {console.log("Form Data :", formFieldData)}
      {console.log("ID :", id)}
      {console.log("Form Field :", formField)}
      {formField.map((field, index) => {
        const { label, type, id } = field;
        return (
          <div key={index} className="pt-4">
            <label className="text-gray-900 font-semibold py-2">{label}</label>
            <div className="flex">
              <input
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
                type={type}
                onChange={(e) => setFormFeildData({ ...formFieldData, [id]: e.target.value })}
                value={formFieldData[id]}
              />
              <button
                className="text-black border-2 border-transparent  hover:border-red-600 w-full bg-gray-200 mx-2 px-4 py-2 rounded-lg hover:bg-gray-300"
                onClick={() => removeField(id)}
              >
                Remove ❌
              </button>
            </div>
          </div>
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
          >
            Add New Field ➕
          </button>
        </div>
      </div>
      <div className="flex justify-between w-full mt-5">
        <button
          className="text-white w-full bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
          onClick={handleFormSubmit}
        >
          Submit ✔
        </button>
        <button
          className="text-white w-full bg-blue-500 mx-2 px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
          onClick={closeFormCB}
        >
          Home 🏠
        </button>
      </div>
    </>
  );
}

export default Form;
