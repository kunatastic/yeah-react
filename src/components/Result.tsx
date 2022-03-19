import React from "react";
import { IFormFields } from "../types/forms";

function Result(props: { results: IFormFields[] }) {
  const { results } = props;
  return (
    <div>
      <h1 className="text-3xl py-4">Result</h1>
      <h1 className="text-gray-500">Id. Label and data</h1>

      {results.map((result, index) => {
        const { id, value, label } = result;

        return (
          <div key={index} className="my-2 bg-blue-300 px-5 py-2 hover:bg-blue-400">
            <span className="font-bold">
              {id}. {label}
            </span>{" "}
            <span>{value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Result;
