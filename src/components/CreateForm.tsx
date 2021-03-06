import { navigate } from "raviger";
import React, { useState } from "react";
import { formMetaType, Error } from "../types/FormsTypes";
import { createForm } from "../util/ApiUtils";
import Confetti, { ConfettiConfig } from "react-dom-confetti";

function validateForm(form: formMetaType): Error<formMetaType> {
  const errors: Error<formMetaType> = {};
  if (form.title.length < 1) {
    errors.title = "Title is required";
  } else if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  return errors;
}

function CreateForm() {
  const [form, setForm] = useState<formMetaType>({
    id: "",
    title: "",
    description: "",
    is_public: false,
  });

  const config: ConfettiConfig = {
    angle: 152,
    spread: 300,
    startVelocity: 40,
    elementCount: 97,
    dragFriction: 0.2,
    duration: 5000,
    stagger: 0,
    width: "7px",
    height: "13px",
    colors: ["#000", "#00f"],
  };

  const [errors, setErrors] = useState<Error<formMetaType>>({});
  const [start, setStart] = useState(false);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await createForm(form);
        setStart(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        navigate(`/form/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className=" flex justify-center t-0 z-50">
        <Confetti config={config} active={start} />
      </div>
      <div className="w-full max-w-lg divide-y divide-gray-200">
        <h1 className="text-2xl my-2 text-gray-700">Create New Form</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              className={`${errors.title ? "text-red-500" : "text-gray-900"} font-semibold py-4`}
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
              type="text"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              value={form.title}
              name="title"
              id="title"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label
              className={`${
                errors.description ? "text-red-500" : "text-gray-900"
              } font-semibold py-4`}
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              value={form.description}
              name="description"
              id="description"
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label
              className={`${
                errors.is_public ? "text-red-500" : "text-gray-900"
              } font-semibold py-4`}
              htmlFor="public"
            >
              Is Public?
            </label>
            <div>
              <input
                className="border-gray-200 py-4 mr-2"
                type="checkbox"
                onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
                value="Public"
                name="public"
                id="public"
              />
              <label>Public</label>
            </div>
            {errors.is_public && <p className="text-red-500">{errors.is_public}</p>}
          </div>

          <button
            className="w-full px-4 py-2 z-50 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Form
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateForm;
