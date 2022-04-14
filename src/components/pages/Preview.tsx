import { navigate, useQueryParams } from "raviger";
import React, { useEffect, useReducer, useState } from "react";
import { getInitialFormData, saveFormData } from "../../util/StorageUtils";
import { PreviewFormReducer } from "../../util/ActionReducerUtils";
import { BG_COLOR_OPACITY } from "../../config";
import PreviewField from "../PreviewField";
import { AcceptedKind } from "../../types/CommonTypes";

function Preview(props: { formId: string }) {
  const { formId } = props;
  const [{ questionId }, setQuery] = useQueryParams();
  const [formField, dispatch] = useReducer(PreviewFormReducer, null, () =>
    getInitialFormData(formId)
  );
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
    if (questionId) setQuestion(Number(questionId));
    else setQuery({ questionId: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setQuery({ questionId: question });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  function onChangeHandler(value: string[] | string, id: string, kind: AcceptedKind) {
    if (kind === "DROPDOWN") {
      dispatch({ type: "UPDATE_FORM_VALUE_MULTIPLE", id: id, value: value as string[] });
    } else if (kind === "RADIO" || kind === "TEXT") {
      dispatch({ type: "UPDATE_FORM_VALUE_SINGLE", id: id, value: value as string });
    }
  }

  function handleSaveAndResult() {
    saveFormData(formField);
    navigate(`/result/${formId}`);
  }

  return (
    <>
      <div
        style={{ backgroundColor: formField.color + BG_COLOR_OPACITY }}
        className="p-4 rounded-xl shadow-inner"
      >
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
            <p className="text-center font-semibold py-4 text-2xl">
              {question + 1} out of {formField.formfields.length} Questions
            </p>
            <PreviewField
              field={formField.formfields[question]}
              onChangeHandler={onChangeHandler}
            />
            <div className="flex justify-center mt-8 w-full">
              <button
                className={`w-full mx-2 px-4 py-2 text-center rounded-lg border-2 border-black ${
                  question === 0 && "bg-black-100 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (question !== 0) setQuestion(question - 1);
                }}
                type="button"
              >
                ◀ Previous
              </button>
              <button
                className={`w-full mx-2 px-4 py-2 text-center rounded-lg border-2 border-black ${
                  question + 1 === formField.formfields.length && "bg-blue-300 hover:bg-blue-400"
                }`}
                type="button"
                onClick={() => {
                  if (question !== formField.formfields.length) setQuestion(question + 1);
                }}
              >
                {formField.formfields.length === question + 1 ? "Submit ▶" : "Next ▶"}
              </button>
            </div>
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
        </div>
      </div>
    </>
  );
}

export default Preview;
