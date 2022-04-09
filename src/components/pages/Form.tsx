import { Link, navigate } from "raviger";
import React, { useEffect, useRef, useReducer } from "react";
import { IFormFieldProps } from "../../types/FormsTypes";
import { EditFormReducer } from "../../util/ActionReducerUtils";
import { getInitialFormData, saveFormData, verifyFormId } from "../../util/StorageUtils";
import Fields from "../Fields";
import NewField from "../NewField";

function Form(props: IFormFieldProps): JSX.Element {
  const { formId } = props;

  const [formField, dispatch] = useReducer(EditFormReducer, null, () => getInitialFormData(formId));
  const titleRef = useRef<HTMLInputElement>(null);

  //! Change the title of document if the Form component is rendered
  useEffect(() => {
    document.title = formField.title + " Form - Settings";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, [formField.title]);

  //! Save the Form Data to LocalStorage on every change
  useEffect(() => {
    const timeout = setTimeout(() => saveFormData(formField), 1000);
    return () => clearTimeout(timeout);
  }, [formField]);

  useEffect(() => {
    if (!verifyFormId(formId)) {
      console.log("FALSE");
      navigate("/form-do-not-exist", { replace: true });
    } else {
      console.log("TRUE");
    }
  }, []);

  function onChangeLabelHandler(label: string, id: string) {
    dispatch({ type: "UPDATE_FORM_LABEL", id: id, label: label });
  }

  return (
    <>
      <form>
        <div className="bg-blue-200 py-2 px-4 rounded-xl">
          <div className="flex gap-2 py-2">
            <label className="text-gray-900 font-semibold py-2">Form Name: </label>
            <input
              className="w-full px-4 py-2 border-2 rounded-lg flex-1 focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
              type="text"
              onChange={(e) => dispatch({ type: "UPDATE_FORM_TITLE", title: e.target.value })}
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
                dispatch({ type: "UPDATE_FORM_AMBIANCE_COLOR", color: e.target.value })
              }
              value={formField.color}
            />
          </div>
        </div>

        {formField.formfields !== undefined &&
          formField.formfields.map((field, index) => {
            return (
              <Fields
                key={index}
                preview={false}
                field={field}
                onClickHandler={(_) => dispatch({ type: "REMOVE_FORM_FIELD", id: field.id })}
                onLabelChangeHandler={onChangeLabelHandler}
              />
            );
          })}

        <NewField formField={formField} dispatchFormAction={dispatch} />
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
