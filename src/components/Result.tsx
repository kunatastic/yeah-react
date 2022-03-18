import React from "react";
import { IFormFieldData } from "../types/forms";

function Result(props: { results: IFormFieldData }) {
  const { results } = props;
  return (
    <div>
      <h1 className="text-3xl py-4">Result</h1>
      <h1 className="text-gray-500">Id and data</h1>

      {Object.keys(results).map((key, index) => {
        return (
          <div key={index} className="my-2 bg-blue-300 px-5 py-2 hover:bg-blue-400">
            <span className="font-bold">{key}</span> <span>{results[key]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Result;
