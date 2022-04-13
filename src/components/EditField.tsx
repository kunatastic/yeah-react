import React, { useState } from "react";
import { editFieldProps } from "../types/CommonTypes";

function Fields(props: editFieldProps) {
  const [editLabel, setEditLabel] = useState(false);
  const { field, onClickHandler, onLabelChangeHandler } = props;
  return (
    <div className="pt-4">
      <div className="flex justify-between bg-gray-100 p-2">
        {editLabel ? (
          <input
            className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            type="text"
            onChange={(e) => onLabelChangeHandler(e.target.value, field.id)}
            value={field.label}
          />
        ) : (
          <label className="text-gray-900 font-semibold py-2">
            {field.label} (
            <span className="text-blue-700 font-semibold py-2 capitalize">{field.fieldType}</span>)
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
              onClickHandler(field.id);
            }}
            type="button"
          >
            Remove Field
          </button>
        </div>
      </div>
    </div>
  );
}

export default Fields;
