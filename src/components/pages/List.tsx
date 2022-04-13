import { Link, useQueryParams } from "raviger";
import React, { useEffect, useState } from "react";
import { Pagination } from "../../types/CommonTypes";
import { formMetaType } from "../../types/FormsTypes";
import { deleteForm, listForm } from "../../util/ApiUtils";
import Modal from "../common/Modal";
import CreateForm from "../CreateForm";

// function getFormData(setFormCB: (data: dummyForm[]) => void) {
//   fetch("https://tsapi.coronasafe.live/api/mock_test/")
//     .then((response) => response.json())
//     .then((data) => setFormCB(data));
// }

async function getFormData(setFormCB: (data: formMetaType[]) => void) {
  try {
    const data: Pagination<formMetaType> = await listForm({ offset: 0, limit: 3 });
    setFormCB(data.results);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

function List() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState<string>("");
  const [form, setForm] = useState<formMetaType[]>([]);
  const [newForm, setNewForm] = useState(false);

  useEffect(() => {
    getFormData((data) => setForm(data));
  }, []);

  async function deleteFormData(formId: string) {
    await deleteForm(formId);
    getFormData((data) => setForm(data));
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
      <div className="grid  grid-cols-1 lg:grid-cols-2 self-center gap-4">
        {form
          .filter((form) => form.title.toLowerCase().includes(search?.toLowerCase() || ""))
          .map((form, index) => {
            return (
              <div
                key={index}
                className="w-full rounded-md shadow-xl hover:shadow-md flex justify-between"
                // style={{
                //   backgroundColor: form.color ? form.color + BG_COLOR_OPACITY : "rgb(219 234 254)",
                // }}
              >
                <div className="p-4">
                  <h1 className="text-xl font-semibold">
                    {index + 1}.) {form.title}
                  </h1>
                  <p className="text-sm">{form.description}</p>
                  <span className="text-sm">{form.is_public ? "Public" : "Private"}</span>
                </div>
                <div className="flex flex-col justify-between px-4 py-2">
                  <button
                    className="text-black bg-red-400 text-center w-full px-2 hover:bg-red-500 border border-transparent border-black"
                    onClick={() => {
                      if (form.id) deleteFormData(form.id);
                    }}
                    type="button"
                  >
                    Delete
                  </button>
                  <Link
                    className="text-black bg-blue-400 text-center w-full px-2 hover:bg-blue-500 border border-transparent border-black"
                    type="button"
                    href={`/form/${form.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="text-black bg-green-400 text-center w-full px-2 hover:bg-green-500 border border-transparent border-black"
                    type="button"
                    href={`/preview/${form.id}`}
                  >
                    Preview
                  </Link>
                </div>
              </div>
            );
          })}
        <div className="w-full p-4 border-black bg-gray-200 rounded-md shadow-xl hover:shadow-md hover:bg-gray-300">
          <h1 className="text-xl font-semibold">New Form</h1>
          <div className="flex justify-between mt-5">
            <button
              className="text-white bg-blue-500 w-full hover:bg-blue-600 border border-transparent hover:border-black"
              onClick={() => setNewForm(true)}
            >
              Create New Form
            </button>
          </div>
        </div>

        <Modal open={newForm} onCloseCB={() => setNewForm(false)}>
          <CreateForm />
        </Modal>
      </div>
    </>
  );
}

export default List;
