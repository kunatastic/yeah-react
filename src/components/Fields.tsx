import React, { useState } from "react";
import { IFieldProps } from "../types/forms";

function Fields(props: IFieldProps) {
  const [editLabel, setEditLabel] = useState(false);
  return (
    <div className="pt-4">
      {props.preview ? (
        <>
          <label className="text-gray-900 font-semibold py-2">{props.label}</label>
          <input
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            type={props.type}
            onChange={(e) => props.onChangeHandler(e, props.id)}
            value={props.value}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between bg-gray-100 p-2">
            {editLabel ? (
              <input
                className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
                type="text"
                onChange={(e) => props.onLabelChangeHandler(e, props.id)}
                value={props.label}
              />
            ) : (
              <label className="text-gray-900 font-semibold py-2">
                {props.label} (
                <span className="text-blue-700 font-semibold py-2 capitalize">{props.type}</span>)
              </label>
            )}
            <div>
              <button
                className="text-black border-2 border-transparent  hover:border-red-600 bg-gray-200 mx-2 px-4 py-2 rounded-lg hover:bg-gray-300"
                onClick={() => {
                  setEditLabel(!editLabel);
                }}
                type="button"
              >
                Update Field
              </button>
              <button
                className="text-black border-2 border-transparent  hover:border-red-600 bg-gray-200 mx-2 px-4 py-2 rounded-lg hover:bg-gray-300"
                onClick={() => {
                  props.onClickHandler(props.id);
                }}
                type="button"
              >
                Remove Field
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Fields;
