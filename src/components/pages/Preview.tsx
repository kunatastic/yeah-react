import { useQueryParams } from "raviger";
import React, { useEffect, useState } from "react";
import { formFieldType, formMetaDataType, resultType } from "../../types/ApiTypes";
import { formSubmissionValuesTypes } from "../../types/CommonTypes";
import { getFormFields, getFormMetaData, postSubmissionValue } from "../../util/ApiUtils";
import Modal from "../common/Modal";
import PreviewField from "../PreviewField";

async function fetchFormMetaData(
  formId: string,
  setFormMetaData: (data: formMetaDataType) => void
) {
  const data = await getFormMetaData(formId);
  console.log(data);
  setFormMetaData(data);
}

async function fetchFormFields(
  formId: string,
  setFormFields: (data: formFieldType) => void,
  // setFormSubmissionValue: (value: React.SetStateAction<formSubmissionValuesTypes[]>) => void
  cb: (data: resultType[]) => void
) {
  const data: formFieldType = await getFormFields(formId);
  setFormFields(data);
  cb(data.results);
}

function Preview(props: { formId: string }) {
  const { formId } = props;
  const [{ questionId }, setQuery] = useQueryParams();
  const [question, setQuestion] = useState(0);
  const [formMetaData, setFormMetaData] = useState<null | formMetaDataType>(null);
  const [formFields, setFormFields] = useState<null | formFieldType>(null);

  const [formSubmissionValue, setFormSubmissionValue] = useState<formSubmissionValuesTypes[]>([]);
  const [indexArr, setIndexArr] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

  //! Change the title of document if the Form component is rendered
  useEffect(() => {
    document.title = formMetaData?.title + " Form - Preview";
    //? Cleanup the useEffect hook on unmount of the Form Component
    return () => {
      document.title = "React App";
    };
  }, [formMetaData?.title]);

  useEffect(() => {
    if (questionId) setQuestion(Number(questionId));
    else setQuery({ questionId: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setQuery({ questionId: question });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  useEffect(() => {
    fetchFormMetaData(formId, setFormMetaData);
    fetchFormFields(formId, setFormFields, (data) => {
      let newState: formSubmissionValuesTypes[] = [];
      data.forEach((result: resultType) => {
        newState.push({ form_field: result.id, value: "" });
      });
      const index = newState.map((item) => item.form_field);
      setFormSubmissionValue(newState);
      setIndexArr(index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  function onChangeHandler(value: string, id: string) {
    setFormSubmissionValue((prevState) => {
      const newState = [...prevState];
      newState.forEach((result) => {
        if (result.form_field === id) result.value = value;
      });
      console.log(newState);
      return newState;
    });
  }

  function handleSaveAndResult() {
    // saveFormData(formField);
    // navigate(`/result/${formId}`);
    if (formMetaData !== null)
      postSubmissionValue(formId, { answers: formSubmissionValue, form: formMetaData });
  }

  return (
    <>
      <div className="p-4 rounded-xl shadow-inner bg-yellow-50 overflow-hidden relative">
        {formFields?.count === 0 ? (
          <>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-blue-400">
              Sorry! No fields found.
            </h1>
          </>
        ) : question === formFields?.count ? (
          <>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-blue-400">
              Survey Completed...
            </h1>
          </>
        ) : (
          <>
            <p className="text-center font-semibold py-4 text-2xl">
              {question + 1} out of {formFields?.count} Questions
            </p>
            {/* <PreviewField
              field={formField.formfields[question]}
              // onChangeHandler={onChangeHandler}
            /> */}
            {formFields && (
              <PreviewField
                field={formFields.results[question]}
                onChangeHandler={onChangeHandler}
                value={formSubmissionValue[indexArr.indexOf(formFields.results[question].id)]}
              />
            )}
            {/* {formFields?.results.map((result, index) => (
              <React.Fragment key={index}>
                <PreviewField
                  field={result}
                  value={formSubmissionValue[indexArr.indexOf(result.id)]}
                  onChangeHandler={onChangeHandler}
                />
              </React.Fragment>
            ))} */}
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

              {formFields?.count === question + 1 ? (
                <button
                  className="w-full mx-2 px-4 py-2 text-center rounded-lg border-2 border-black bg-blue-300 hover:bg-blue-400"
                  type="button"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Submit
                </button>
              ) : (
                <>
                  <button
                    className="w-full mx-2 px-4 py-2 text-center rounded-lg border-2 border-black"
                    type="button"
                    onClick={() => {
                      if (question !== formFields?.count) setQuestion(question + 1);
                    }}
                  >
                    Next ▶
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {/* <div className="flex justify-between w-full mt-5">
          {question === formFields?.count && (
            <button
              className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent  hover:border-black"
              onClick={handleSaveAndResult}
            >
              Save and view Result ✔
            </button>
          )}
        </div> */}

        <Modal open={openModal} onCloseCB={() => setOpenModal(false)}>
          <div className="py-5 px-2">
            <h1 className="text-semibold">
              Heads up!! The fields cannot be modified later are you sure you want to submit the
              form
            </h1>
            <div className="flex justify-center mt-8 w-full">
              <button
                className="w-full mx-2 px-4 py-2 text-center rounded-lg border-2 border-black"
                onClick={() => setOpenModal(false)}
                type="button"
              >
                ❌ Cancel
              </button>
              <button
                className="w-full mx-2 px-4 py-2 text-center rounded-lg border-2 border-black"
                onClick={() => {
                  if (question !== formFields?.count) setQuestion(question + 1);
                  handleSaveAndResult();
                  setOpenModal(false);
                }}
                type="button"
              >
                Submit ✔
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Preview;
