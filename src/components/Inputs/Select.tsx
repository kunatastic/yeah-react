import React from "react";
import { InputFormField } from "../../types/forms";

function Select(props: {
  field: InputFormField;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>, id: string) => void;
}) {
  if (props.field.kind === "dropdown" && props.field.type === "single")
    return (
      <>
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <br />
        <select
          value={props.field.value}
          onChange={(e) => props.onChangeHandler(e, props.field.id)}
          className="w-full px-4 py-2 bg-whiteborder-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
        >
          <option value="null">Select a type</option>
          {props.field.options.map((option, index) => (
            <option value={option} key={index} className="capitalize">
              {option}
            </option>
          ))}
        </select>
      </>
    );
  else return null;
}

export default Select;