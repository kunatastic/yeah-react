import React, { useState } from "react";
import { resultType } from "../types/ApiTypes";
import { AcceptedKind } from "../types/CommonTypes";
import { fieldType, inputTypes } from "../types/FormsTypes";
import { createNewFormField } from "../util/ActionReducerUtils";
import { updateField } from "../util/ApiUtils";

const fieldTypes: { label: string; value: string; kind: AcceptedKind }[] = [
  { label: "Text", value: "text", kind: "TEXT" },
  { label: "Date", value: "date", kind: "TEXT" },
  { label: "Time", value: "time", kind: "TEXT" },
  { label: "Number", value: "number", kind: "TEXT" },
  { label: "Email", value: "email", kind: "TEXT" },
  { label: "Phone", value: "tel", kind: "TEXT" },
  { label: "Textarea", value: "textarea", kind: "TEXT" },
  { label: "Password", value: "password", kind: "TEXT" },
  { label: "Dropdown", value: "single", kind: "RADIO" },
  { label: "Multi-Select", value: "multiple", kind: "DROPDOWN" },
  { label: "Checkbox", value: "checkbox", kind: "DROPDOWN" },
  { label: "Radio", value: "radio", kind: "RADIO" },
];

const optionFieldTypes: { label: string; value: fieldType; kind: "RADIO" | "DROPDOWN" }[] = [
  { label: "Dropdown", value: "single", kind: "RADIO" },
  { label: "Multi-Select", value: "multiple", kind: "DROPDOWN" },
  { label: "Checkbox", value: "checkbox", kind: "DROPDOWN" },
  { label: "Radio", value: "radio", kind: "RADIO" },
];

function UpdateField(props: { formId: string; initialData: resultType; onCloseCB: () => void }) {
  const { formId, initialData, onCloseCB } = props;
  const [error, setError] = useState<{ [key: string]: boolean }>({
    error1: false,
    error2: false,
    error3: false,
  });
  const [optionInput, setOptionInput] = useState<string>("");
  const [fieldType, setFieldType] = useState<inputTypes>(() => {
    return createNewFormField(
      initialData.id,
      initialData.label,
      initialData.kind,
      initialData.meta.fieldType,
      initialData?.options ? initialData.options : []
    );
  });

  //! Add a new Field to the Form
  async function updateFieldInput() {
    if (fieldType?.label.length === 0) {
      setError({ ...error, error1: true });
      return;
    } else if (fieldType === null) {
      setError({ ...error, error2: true });
      return;
    } else if (
      (fieldType?.kind === "RADIO" || fieldType?.kind === "DROPDOWN") &&
      fieldType?.options.length === 0
    ) {
      setError({ ...error, error3: true });
      return;
    }
    await updateField(formId, fieldType.id, fieldType);
    setError({ ...error, error1: false, error2: false, error3: false });
    onCloseCB();
  }

  function onChangeHandler(formFieldType: fieldType) {
    const tempType = fieldTypes.filter((field) => field.value === formFieldType);
    setFieldType((prevState) => {
      return createNewFormField(prevState.id, prevState.label, tempType[0].kind, formFieldType, []);
    });
  }

  return (
    <div className="mt-4 p-4 rounded-xl">
      <div className="grid grid-cols-3 gap-2 align-bottom">
        <div className="col-start-1 col-span-2">
          <label className="text-gray-900 font-semibold py-2">
            Add Field {error.error1 && <span className="text-red-500">Field cannot be empty</span>}
          </label>
          <input
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            type="text"
            onChange={(e) =>
              setFieldType((formType) => {
                if (fieldType) return { ...fieldType, label: e.target.value };
                return formType;
              })
            }
            value={fieldType.label}
          />
        </div>
        <div>
          <label className="text-gray-900 font-semibold py-2">
            Type {error.error2 && <span className="text-red-500">Type not selected</span>}
          </label>
          <select
            value={fieldType.fieldType}
            onChange={(e) => onChangeHandler(e.target.value as fieldType)}
            className="w-full px-4 py-2 bg-whiteborder-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
          >
            {fieldTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {optionFieldTypes.filter((item) => item.value === fieldType.fieldType).length === 1 && (
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
                if (fieldType.kind === "DROPDOWN" || fieldType.kind === "RADIO") {
                  setFieldType({ ...fieldType, options: [...fieldType.options, optionInput] });
                  setOptionInput("");
                }
              }}
              type="button"
            >
              Add Option
            </button>
          </div>
          <div>
            <label className="text-gray-900 font-semibold py-2">Selected Options</label>
            <div className="flex flex-wrap">
              {(fieldType?.kind === "DROPDOWN" || fieldType?.kind === "RADIO") &&
                (fieldType?.options.length === 0 ? (
                  <h1 className="font-light">No options added yet</h1>
                ) : (
                  fieldType?.options.map((option, index) => (
                    <div
                      key={index}
                      className="capitalize bg-blue-700 text-white rounded-full mx-4 my-2 py-1 px-3"
                    >
                      {option}
                      <button
                        onClick={() => {
                          if (fieldType?.kind === "DROPDOWN" || fieldType?.kind === "RADIO")
                            setFieldType({
                              ...fieldType,
                              options: fieldType.options.filter(
                                (_, itemIndex) => itemIndex !== index
                              ),
                            });
                        }}
                        type="button"
                      >
                        ⛔
                      </button>
                    </div>
                  ))
                ))}
            </div>
          </div>
        </>
      )}
      <button
        className="text-white w-full bg-gray-500 px-4 py-2 border-2 border-transparent hover:border-green-500 mt-5 rounded-lg hover:bg-gray-600"
        onClick={updateFieldInput}
        type="button"
      >
        Update Field ➕
      </button>
    </div>
  );
}

export default UpdateField;
