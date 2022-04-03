import React, { useState } from "react";
import { formFieldOptions } from "../data/FormField";
import { IFormData, InputFormField, inputTypes } from "../types/forms";
import { createNewFormField } from "../util/action-reducer";
interface INewFieldProps {
  formField: IFormData;
  setFormField: React.Dispatch<React.SetStateAction<IFormData>>;
}

function NewField(props: INewFieldProps) {
  const { setFormField, formField } = props;

  const [error, setError] = useState<{ [key: string]: boolean }>({
    error1: false,
    error2: false,
    error3: false,
  });
  const [optionInput, setOptionInput] = useState<string>("");
  const [fieldType, setFieldType] = useState<inputTypes>({
    kind: "null",
    fieldType: "null",
    label: "",
  });

  //! Add a new Field to the Form
  function addNewField() {
    if (fieldType.label.length === 0) {
      setError({ ...error, error1: true });
      return;
    }
    if (fieldType.kind === "null") {
      setError({ ...error, error2: true });
      return;
    }
    if (
      (fieldType.kind === "dropdown" || fieldType.kind === "multiselect") &&
      fieldType.options.length === 0
    ) {
      setError({ ...error, error3: true });
      return;
    }

    setFormField({
      ...formField,
      formfields: [...formField.formfields, createNewFormField(fieldType)],
    });
    setError({ ...error, error1: false, error2: false, error3: false });
    setFieldType({ kind: "null", fieldType: "null", label: "" });
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    formFieldOptions.forEach((field) => {
      field.inputOptions.forEach((option) => {
        if (option.fieldType === e.target.value) {
          setFieldType(option);
        }
      });
    });
    // console.log(e.target.value);
  }

  return (
    <div className="mt-4 p-4 rounded-xl bg-blue-200">
      <div className="grid grid-cols-3 gap-2 align-bottom">
        <div className="col-start-1 col-span-2">
          {}
          <label className=" text-gray-900 font-semibold py-2">
            Add Field {error.error1 && <span className="text-red-500">Field cannot be empty</span>}
          </label>
          <input
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            type="text"
            onChange={(e) => setFieldType({ ...fieldType, label: e.target.value })}
            value={fieldType.label}
          />
        </div>
        <div>
          <label className="text-gray-900 font-semibold py-2">
            Type {error.error2 && <span className="text-red-500">Type not selected</span>}
          </label>
          <select
            value={fieldType.fieldType}
            onChange={(e) => onChangeHandler(e)}
            className="w-full px-4 py-2 bg-whiteborder-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
          >
            <option value="null">Select a type</option>
            {formFieldOptions.map((field, index) => (
              <optgroup label={field.groupName} key={index}>
                {field.inputOptions.map((option, index) => (
                  <option value={option.fieldType} key={index} className="capitalize">
                    {option.fieldType}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
      {(fieldType.kind === "dropdown" || fieldType.kind === "multiselect") && (
        <>
          <div className="grid grid-cols-3 gap-2 align-bottom">
            <div className="col-start-1 col-span-2">
              <label className="text-gray-900 font-semibold py-2">
                Options{" "}
                {error.error3 && <span className="text-red-500">Options cannot be empty</span>}
              </label>
              <input
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
                type="text"
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
              />
            </div>
            <button
              className="text-white w-full bg-gray-500 px-4 py-2 border-2 border-transparent  hover:border-green-500 mt-6 rounded-lg hover:bg-gray-600"
              onClick={() => {
                setFieldType({ ...fieldType, options: [...fieldType.options, optionInput] });
                setOptionInput("");
              }}
              type="button"
            >
              Add Option
            </button>
          </div>
          <div>
            <label className="text-gray-900 font-semibold py-2">Selected Options</label>
            <div className="flex flex-wrap">
              {fieldType.options.length === 0 ? (
                <>
                  <h1 className="font-light">No options added yet</h1>
                </>
              ) : (
                fieldType.options.map((option, index) => (
                  <div className="capitalize bg-blue-700 text-white rounded-full mx-4 my-2 py-1 px-3">
                    {option}{" "}
                    <button
                      onClick={() => {
                        setFieldType({
                          ...fieldType,
                          options: fieldType.options.filter((_, itemIndex) => itemIndex !== index),
                        });
                      }}
                      type="button"
                    >
                      ⛔
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
      <button
        className="text-white w-full bg-gray-500 px-4 py-2 border-2 border-transparent  hover:border-green-500 mt-5 rounded-lg hover:bg-gray-600"
        onClick={addNewField}
        type="button"
      >
        Add New Field ➕
      </button>
    </div>
  );
}

export default NewField;
