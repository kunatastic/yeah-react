import React from "react";
import { IFormFields } from "../data/FormField";

interface IFormField {
  FormFields: IFormFields[];
}

function Form(props: IFormField) {
  const { FormFields } = props;
  return (
    <>
      {FormFields.map((field, index) => {
        const { label, type, data } = field;
        return (
          <div key={index} className="pt-4">
            <label className="text-gray-900 font-semibold py-2">{label}</label>
            <input
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
              type={type}
              value={data}
            />
          </div>
        );
      })}
      <button className="text-white bg-blue-500 px-4 py-2 mt-4 rounded-lg hover:bg-blue-600">
        Submit
      </button>
    </>
  );
}

export default Form;
