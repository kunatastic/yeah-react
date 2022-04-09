import { Link } from "raviger";
import React, { useState } from "react";
import { IFormData } from "../../types/FormsTypes";
import { getInitialFormData } from "../../util/StorageUtils";

function Result(props: { formId: string }) {
  const { formId } = props;
  const [results] = useState<IFormData>(() => getInitialFormData(formId));

  return (
    <div>
      <h1 className="text-3xl py-4">Result</h1>
      <h1 className="text-gray-500">Id. Label and data</h1>
      {results.formfields.map((result, index) => {
        const { value, label } = result;
        return (
          <div key={index} className="my-2 bg-blue-300 px-5 py-2 hover:bg-blue-400">
            <span className="font-bold">
              {index + 1}. {label}
            </span>{" "}
            <span>{typeof value === "object" ? value.join(", ") : value}</span>
          </div>
        );
      })}
      <div className="flex justify-between w-full mt-5">
        <Link
          className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
          type="button"
          href="/"
        >
          Home 🏠
        </Link>
        <Link
          className="text-white w-full bg-blue-500 mx-2 px-4 py-2 text-center rounded-lg hover:bg-blue-600 border-2 border-transparent hover:border-black"
          type="button"
          href={`/form/${formId}`}
        >
          Form 📑
        </Link>
      </div>
    </div>
  );
}

export default Result;
