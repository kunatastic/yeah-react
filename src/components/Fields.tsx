import React from "react";
import { IFieldProps } from "../types/forms";

function Fields(props: IFieldProps) {
  const { field, onClickHandler, onChangeHandler } = props;
  const { label, type, id, value } = field;
  return (
    <div className="pt-4">
      <label className="text-gray-900 font-semibold py-2">
        {id}. {label}-[{value}]
      </label>
      <div className="flex">
        <input
          className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
          type={type}
          onChange={(e) => onChangeHandler(e, id)}
          value={value}
        />
        <button
          className="text-black border-2 border-transparent  hover:border-red-600 w-full bg-gray-200 mx-2 px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={(e) => onClickHandler(id)}
          type="button"
        >
          Remove ❌
        </button>
      </div>
    </div>
  );
}

export default Fields;
