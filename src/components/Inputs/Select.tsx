import React from "react";
import { InputFormProps } from "../../types/FormsTypes";

function Select(props: InputFormProps) {
  if (props.field.kind === "RADIO" && props.field.meta.fieldType === "single")
    return (
      <>
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <br />
        <select
          value={props.value.value}
          onChange={(e) => props.onChangeHandler(e.target.value, props.field.id)}
          className="w-full px-4 py-2 bg-whiteborder-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
        >
          <option value="null">Select a type</option>
          {(props.field.options as string[]).map((option, index) => (
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
