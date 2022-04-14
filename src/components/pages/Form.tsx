import { Link } from "raviger";
import React, { useEffect, useRef, useState } from "react";
import { formFieldType, formMetaDataType } from "../../types/ApiTypes";
import { formMetaType } from "../../types/FormsTypes";
import { getFormMetaData, getFormFields, patchFormMetaData } from "../../util/ApiUtils";
import NewField from "../NewField";
import EditField from "../EditField";

async function fetchFormMetaData(
  formId: string,
  setFormMetaData: (data: formMetaDataType) => void
) {
  const data = await getFormMetaData(formId);
  setFormMetaData(data);
}

async function fetchFormFields(formId: string, setFormFields: (data: formFieldType) => void) {
  const data = await getFormFields(formId);
  setFormFields(data);
}

async function updateFormMetaData(formId: string, formData: formMetaDataType) {
  const updatedFormData: formMetaType = {
    title: formData.title,
    description: formData.description,
    is_public: formData.is_public,
  };
  await patchFormMetaData(formId, updatedFormData);
}

function str2bool(value: string): boolean {
  if (value.toLowerCase() === "true") return true;
  else if (value.toLowerCase() === "false") return false;
  return false;
}

function Form(props: { formId: string }): JSX.Element {
  const { formId } = props;

  const [formMetaData, setFormMetaData] = useState<null | formMetaDataType>(null);
  const [formFields, setFormFields] = useState<null | formFieldType>(null);
  const [updateMeta, setUpdateMeta] = useState(false);

  useEffect(() => {
    fetchFormMetaData(formId, setFormMetaData);
    fetchFormFields(formId, setFormFields);
  }, [formId]);

  const titleRef = useRef<HTMLInputElement>(null);

  //! Change the title of document if the Form component is rendered
  useEffect(() => {
    document.title = formMetaData?.title + " Form - Settings";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, [formMetaData?.title]);

  return (
    <>
      <form>
        <div className="bg-blue-200 py-2 px-4 rounded-xl">
          {updateMeta ? (
            <>
              <div className="flex gap-2 py-2">
                <label className="text-gray-900 font-semibold py-2">Form Name: </label>
                <input
                  className="w-full px-4 py-2 border-2 rounded-lg flex-1 focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
                  type="text"
                  onChange={(e) =>
                    setFormMetaData((formMetaData) => {
                      if (formMetaData) return { ...formMetaData, title: e.target.value };
                      return formMetaData;
                    })
                  }
                  value={formMetaData?.title}
                />
              </div>
              <div className="flex gap-2 py-2">
                <label className="text-gray-900 font-semibold py-2">Form Description: </label>
                <textarea
                  className="w-full px-4 py-2 border-2 rounded-lg flex-1 focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
                  onChange={(e) =>
                    setFormMetaData((formMetaData) => {
                      if (formMetaData) return { ...formMetaData, description: e.target.value };
                      return formMetaData;
                    })
                  }
                  value={formMetaData?.description}
                />
              </div>
              <div className="flex gap-2 py-4">
                <label className="text-gray-900 font-semibold">Form Public: </label>

                {[
                  { name: "Public", value: "true" },
                  { name: "Private", value: "false" },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <input
                      type="radio"
                      name="status"
                      value={item.value}
                      checked={formMetaData?.is_public === str2bool(item.value)}
                      onChange={(e) =>
                        setFormMetaData((formMetaData) => {
                          if (formMetaData)
                            return { ...formMetaData, is_public: str2bool(e.target.value) };
                          return formMetaData;
                        })
                      }
                    />
                    <label>{item.name}</label>
                  </React.Fragment>
                ))}
                <br />
              </div>
              <div className="flex gap-2 ">
                <button
                  type="button"
                  onClick={() => {
                    if (formMetaData) updateFormMetaData(formId, formMetaData);
                    setUpdateMeta(false);
                  }}
                  className="text-white bg-blue-500 px-2 py-1 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
                >
                  Update Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    fetchFormMetaData(formId, setFormMetaData);
                    setUpdateMeta(false);
                  }}
                  className="text-white bg-gray-500 px-2 py-1 text-center rounded-lg hover:bg-gray-600 border-2 border-transparent hover:border-black"
                >
                  Clear Changes
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <label className="text-gray-900 py-2">Form Name: </label>
                <p className="py-2 font-sans text-blue-900 font-semibold">{formMetaData?.title}</p>
              </div>
              <div className="flex gap-2">
                <label className="text-gray-900 py-2">Form Description: </label>
                <p className="py-2 font-sans text-blue-900 font-semibold">
                  {formMetaData?.description}
                </p>
              </div>
              <div className="flex gap-2">
                <label className="text-gray-900 py-2">Form public: </label>
                <p className="py-2 font-sans text-blue-900 font-semibold">
                  {formMetaData?.is_public ? "Public" : "Private"}
                </p>
              </div>
              <div className="flex gap-2 ">
                <button
                  type="button"
                  onClick={() => setUpdateMeta(!updateMeta)}
                  className="text-white bg-blue-500 px-2 py-1 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
                >
                  Update Form details
                </button>
              </div>
            </>
          )}
        </div>

        {/* {formField.formfields !== undefined &&
          formField.formfields.map((field, index) => {
            return (
              <EditField
                key={index}
                field={field}
                onClickHandler={(_) => dispatch({ type: "REMOVE_FORM_FIELD", id: field.id })}
                onLabelChangeHandler={onChangeLabelHandler}
              />
            );
          })} */}

        {formFields?.count === 0 && (
          <p className="py-4 text-xl text-center">
            No formfields found!! Kindly add a new field to continue
          </p>
        )}
        {formFields?.results.map((result, index) => {
          return <EditField fieldInfo={result} formId={formId} key={index} />;
        })}

        <NewField formId={formId} />
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
