import { Link, navigate } from "raviger";
import React, { useEffect, useState, useRef } from "react";
import { formFields as initialFormField } from "../data/FormField";
import { IFormData, IFormFieldProps } from "../types/forms";
import { getLocalForms, saveFormData } from "../util/storage";
import Fields from "./Fields";
import NewField from "./NewField";

//! Get the Form Data from LocalStorage or return default value
// TODO: ADD a custom redirect to `/link` if the formId doesn't exist in the LocalStorage
function getInitialFormData(formId: string): IFormData {
  const localForms = getLocalForms();
  const formData = localForms.find((form) => form.id === formId);
  if (formData) return formData;

  navigate("/form-do-not-exist", { replace: true });
  return {} as never;
}

function Form(props: IFormFieldProps): JSX.Element {
  const { formId } = props;

  const [formField, setFormField] = useState<IFormData>(() => getInitialFormData(formId));
  const titleRef = useRef<HTMLInputElement>(null);

  //! Change the title of document if the Form component is rendered
  useEffect(() => {
    document.title = formField.title + " Form - Settings";
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

  function onChangeLabelHandler(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    setFormField({
      ...formField,
      formfields: formField.formfields.map((field) => {
        if (field.id === id) return { ...field, label: e.target.value };
        return field;
      }),
    });
  }

  function onClickHandler(id: string) {
    removeField(id);
  }

  // Action - Reducer
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "ADD_FIELD":
  //       const newField =
  //       return {
  //         ...state,
  //         formfields: [...state.formfields, action.payload],
  //       };
  //   }
  // };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="bg-blue-200 py-2 px-4 rounded-xl">
          <div className="flex gap-2 py-2">
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
          <div className="flex gap-2 py-2">
            <label className="text-gray-900 font-semibold py-2">Form color: </label>
            <input
              className="h-10 w-24 px-4 py-2 border-2 rounded-lg flex-1 focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
              type="color"
              onChange={(e) =>
                setFormField({
                  ...formField,
                  color: e.target.value,
                })
              }
              value={formField.color}
              // value="#"
            />
          </div>
        </div>

        {formField.formfields.map((field, index) => {
          return (
            <Fields
              key={index}
              preview={false}
              field={field}
              onClickHandler={onClickHandler}
              onLabelChangeHandler={onChangeLabelHandler}
            />
          );
        })}

        <NewField formField={formField} setFormField={setFormField} />
        <div className="flex justify-between w-full mt-5">
          <Link
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            type="button"
            href={`/result/${formId}`}
          >
            Result
          </Link>
          <Link
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
            // onClick={() => changeStateCB("HOME")}
            type="button"
            href={`/preview/${formId}`}
          >
            Preview
          </Link>
        </div>
      </form>
    </>
  );
}

export default Form;
