import React, { useState } from "react";
import { formFieldOptions } from "../data/FormField";
import { IFormData, InputFormField, inputTypes } from "../types/forms";

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
  });
  const [dropDownOptions, setDropDownOptions] = useState<string[]>([]);
  const [newFieldData, setNewFieldData] = useState<string>("");

  //! Add a new Field to the Form
  function addNewField() {
    if (newFieldData.length === 0) {
      setError({ ...error, error1: true });
      return;
    }
    if (fieldType.kind === "null") {
      setError({ ...error, error2: true });
      return;
    }
    if (
      (fieldType.kind === "dropdown" || fieldType.kind === "multiselect") &&
      dropDownOptions.length === 0
    ) {
      setError({ ...error, error3: true });
      return;
    }

    setFormField({
      ...formField,
      formfields: [...formField.formfields, createNewFormField(fieldType)],
    });
    setNewFieldData("");
    setError({ ...error, error1: false, error2: false, error3: false });
    setFieldType({ kind: "null", fieldType: "null" });
    setDropDownOptions([]);
  }

  function createNewFormField(fieldType: inputTypes): InputFormField {
    if (fieldType.kind === "text") {
      return {
        kind: "text",
        id: new Date().getTime().toString(),
        label: newFieldData,
        value: "",
        type: fieldType.fieldType,
      };
    } else if (fieldType.kind === "dropdown") {
      return {
        kind: "dropdown",
        id: new Date().getTime().toString(),
        label: newFieldData,
        value: "",
        options: dropDownOptions,
        type: fieldType.fieldType,
      };
    } else if (fieldType.kind === "multiselect") {
      return {
        kind: "multiselect",
        id: new Date().getTime().toString(),
        label: newFieldData,
        value: [],
        options: dropDownOptions,
        type: fieldType.fieldType,
      };
    }
    return {} as never;
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
            onChange={(e) => setNewFieldData(e.target.value)}
            value={newFieldData}
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
            {formFieldOptions.map((field) => (
              <optgroup label={field.groupName}>
                {field.inputOptions.map((option) => (
                  <option value={option.fieldType} className="capitalize">
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
                setDropDownOptions([...dropDownOptions, optionInput]);
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
              {dropDownOptions.length === 0 ? (
                <>
                  <h1 className="font-light">No options added yet</h1>
                </>
              ) : (
                dropDownOptions.map((option, index) => (
                  <div className="capitalize bg-blue-700 text-white rounded-full mx-4 my-2 py-1 px-3">
                    {option}{" "}
                    <button
                      onClick={() => {
                        setDropDownOptions(
                          dropDownOptions.filter((_, itemIndex) => itemIndex !== index)
                        );
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
