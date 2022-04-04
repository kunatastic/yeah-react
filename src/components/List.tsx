import { Link, navigate, useQueryParams } from "raviger";
import React, { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../config";
import { formFields as initialFormField } from "../data/FormField";
import { IFormData } from "../types/forms";
import { getLocalForms, saveLocalData } from "../util/storage";

function List() {
  const [{ search }, setQuery] = useQueryParams();
  const [allFormData, setAllFormData] = useState<IFormData[]>(() => getLocalForms());
  const [searchString, setSearchString] = useState<string>("");

  // const [data, setData] = useState<Number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  useEffect(() => {
    setAllFormData(() => getLocalForms());
  }, []);

  function deleteFormData(form: IFormData) {
    const newFormData = allFormData.filter((item) => item.id !== form.id);
    saveLocalData(newFormData);
    setAllFormData(newFormData);
  }

  function addNewForm() {
    const newform: IFormData = {
      id: new Date().getTime().toString(36),
      color: "#123456",
      title: "Untitled",
      formfields: initialFormField,
    };
    saveLocalData([...allFormData, newform]);
    navigate(`/form/${newform.id}`);
  }

  return (
    <>
      <form
        method="GET"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <div className="flex gap-2 bg-blue-200 py-2 px-4 my-4 rounded-xl">
          <label className="text-gray-900 font-semibold py-2">Form Name: </label>
          <input
            className="w-full px-4 py-2 border-2 rounded-lg flex-1 focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            type="text"
            onChange={(e) => setSearchString(e.target.value)}
            value={searchString}
            name="search"
          />
          <button
            type="submit"
            className="text-white bg-blue-500 text-center hover:bg-blue-600 border border-transparent hover:border-black px-4"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-2 self-center gap-4">
        {allFormData
          .filter((form) => form.title.toLowerCase().includes(search?.toLowerCase() || ""))
          .map((form, index) => {
            return (
              <div
                key={index}
                className="max-w-xl p-4 rounded-md shadow-xl hover:shadow-md"
                style={{ backgroundColor: form.color ? form.color + "aa" : "rgb(219 234 254)" }}
              >
                <h1 className="text-xl font-semibold">
                  {index + 1}.) {form.title}
                </h1>
                <span className="pl-7">Questions: {form.formfields.length}</span>
                <div className="flex justify-between mt-5 gap-4">
                  <button
                    className="text-white bg-blue-500 hover:bg-blue-600 text-center w-full  border border-transparent hover:border-black"
                    onClick={() => deleteFormData(form)}
                    type="button"
                  >
                    Delete
                  </button>
                  <Link
                    className="text-white bg-blue-500 text-center w-full hover:bg-blue-600 border border-transparent hover:border-black"
                    // onClick={() => props.loadFormCB(form)}
                    type="button"
                    href={`/form/${form.id}`}
                  >
                    Visit
                  </Link>
                </div>
              </div>
            );
          })}
        <div className="w-full p-4 bg-gray-100 rounded-md shadow-xl hover:shadow-md hover:bg-gray-200">
          <h1 className="text-xl font-semibold">New Form</h1>
          <div className="flex justify-between mt-5">
            <button
              className="text-white bg-blue-500 w-full hover:bg-blue-600 border border-transparent hover:border-black"
              onClick={addNewForm}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
