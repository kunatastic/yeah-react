import React from "react";
import { IFieldProps } from "../types/forms";

function Fields(props: IFieldProps) {
  const { field, onClickHandler, onChangeHandler, preview } = props;
  const { label, type, id, value } = field;
  return (
    <div className="pt-4">
      {preview ? (
        <>
          <label className="text-gray-900 font-semibold py-2">{label}</label>
          <input
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            type={type}
            onChange={(e) => onChangeHandler(e, id)}
            value={value}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between bg-gray-100 p-2">
            <label className="text-gray-900 font-semibold py-2">{label}</label>
            <button
              className="text-black border-2 border-transparent  hover:border-red-600 bg-gray-200 mx-2 px-4 py-2 rounded-lg hover:bg-gray-300"
              onClick={() => {
                if (onClickHandler) onClickHandler(id);
              }}
              type="button"
            >
              Remove ❌
            </button>
          </div>
        </>
      )}
      {/* <div className="flex">
        {preview && (
          <input
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            type={type}
            onChange={(e) => onChangeHandler(e, id)}
            value={value}
          />
        )}
        {!preview && (
          <button
            className="text-black border-2 border-transparent  hover:border-red-600 w-full bg-gray-200 mx-2 px-4 py-2 rounded-lg hover:bg-gray-300"
            onClick={() => {
              if (onClickHandler) onClickHandler(id);
            }}
            type="button"
          >
            Remove ❌
          </button>
        )}
      </div> */}
    </div>
  );
}

export default Fields;
