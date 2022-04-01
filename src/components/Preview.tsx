import { Link, navigate, useQueryParams } from "raviger";
import React, { useEffect, useState } from "react";
import { formFields as initialFormField } from "../data/FormField";
import { IFormData } from "../types/forms";
import Fields from "./Fields";
import { getLocalForms, saveFormData } from "../util/storage";

function Preview(props: { formId: string }) {
  const { formId } = props;
  const [{ questionId }, setQuery] = useQueryParams();
  const [formField, setFormField] = useState(() => getInitialData(formId));
  const [question, setQuestion] = useState(0);

  //! Change the title of document if the Form component is rendered
  useEffect(() => {
    document.title = formField.title + " Form - Preview";

    //? Cleanup the useEffect hook on unmount of the Form Component
    return () => {
      document.title = "React App";
    };
  }, [formField.title]);

  useEffect(() => {
    if (questionId) {
      setQuestion(Number(questionId));
    } else {
      setQuery({ questionId: 0 });
    }
  }, []);

  useEffect(() => {
    setQuery({ questionId: question });
  }, [question]);

  function getInitialData(formId: string): IFormData {
    const localForms = getLocalForms();
    const formData = localForms.find((form) => form.id === formId);
    if (formData) return formData;
    navigate("/form-do-not-exist", { replace: true });
    return {} as never;
  }

  // NOTE: any was used to encounter any future feature addition to the formFields values data type
  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string,
    data?: any
  ) {
    if (data === undefined) data = e.target.value;
    console.log("adding data: ", data);
    setFormField({
      ...formField,
      formfields: formField.formfields.map((field) => {
        if (field.id === id) return { ...field, value: data };
        return field;
      }),
    });
  }

  function handleSaveAndResult() {
    saveFormData(formField);
    navigate(`/result/${formId}`);
  }

  return (
    <>
      {formField.formfields.length === 0 ? (
        <>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-blue-400">
            Sorry! No fields found.
          </h1>
        </>
      ) : question === formField.formfields.length ? (
        <>
          <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-blue-400">
            Survey Completed...
          </h1>
        </>
      ) : (
        <>
          <div className="flex justify-center w-full mt-5">
            <button
              className={`text-white w-32 mx-2 px-4 py-2 text-center rounded-lg border-2 border-transparent ${
                question === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "hover:border-black bg-gray-500 hover:bg-gray-600"
              }`}
              onClick={() => {
                if (question !== 0) {
                  setQuestion(question - 1);
                }
              }}
              type="button"
            >
              ◀ Previous
            </button>
            <button
              className={`text-white w-32 mx-2 px-4 py-2 text-center rounded-lg border-2 border-transparent ${
                question === formField.formfields.length
                  ? "bg-gray-300 cursor-not-allowed"
                  : "hover:border-black bg-gray-500 hover:bg-gray-600"
              }`}
              type="button"
              onClick={() => {
                if (question !== formField.formfields.length) {
                  setQuestion(question + 1);
                }
              }}
            >
              Next ▶
            </button>
          </div>

          <Fields
            preview={true}
            field={formField.formfields[question]}
            onChangeHandler={onChangeHandler}
          />

          {/* {formField.formfields.map((field, index) => {
            return (
              <Fields key={index} preview={true} field={field} onChangeHandler={onChangeHandler} />
            );
          })} */}
        </>
      )}

      <div className="flex justify-between w-full mt-5">
        {question === formField.formfields.length && (
          <button
            className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
            onClick={handleSaveAndResult}
          >
            Save and view Result ✔
          </button>
        )}
        <Link
          className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
          type="button"
          href="/"
        >
          Home 🏠
        </Link>
      </div>
    </>
  );
}

export default Preview;
