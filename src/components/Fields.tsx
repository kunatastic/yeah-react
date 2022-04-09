import React, { useState } from "react";
import { IFieldProps } from "../types/FormsTypes";

import Text from "./Inputs/Text";
import Radio from "./Inputs/Radio";
import CheckBox from "./Inputs/CheckBox";
import Select from "./Inputs/Select";
import MultiSelect from "./Inputs/MultiSelect";

function Fields(props: IFieldProps) {
  const [editLabel, setEditLabel] = useState(false);
  return (
    <div className="pt-4">
      {props.preview ? (
        <>
          {/* TEXT KIND */}
          <Text field={props.field} onChangeHandler={props.onChangeHandler} />
          {/* DROPDOWN KIND */}
          <Radio field={props.field} onChangeHandler={props.onChangeHandler} />
          <Select field={props.field} onChangeHandler={props.onChangeHandler} />
          {/* MULTISELECT KIND */}
          <CheckBox field={props.field} onChangeHandler={props.onChangeHandler} />
          <MultiSelect field={props.field} onChangeHandler={props.onChangeHandler} />
        </>
      ) : (
        <>
          <div className="flex justify-between bg-gray-100 p-2">
            {editLabel ? (
              <input
                className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
                type="text"
                onChange={(e) => props.onLabelChangeHandler(e.target.value, props.field.id)}
                value={props.field.label}
              />
            ) : (
              <label className="text-gray-900 font-semibold py-2">
                {props.field.label} (
                <span className="text-blue-700 font-semibold py-2 capitalize">
                  {props.field.type}
                </span>
                )
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
                  props.onClickHandler(props.field.id);
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
