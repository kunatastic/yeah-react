import React from "react";
import { InputFormProps } from "../../types/FormsTypes";

function Text(props: InputFormProps) {
  if (props.field.kind === "TEXT")
    return (
      <>
        <label className="text-gray-900 font-semibold py-4">{props.field.label}</label>
        <input
          className="w-full px-4 bg-blue-50 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
          type={props.field.meta.fieldType}
          onChange={(e) => props.onChangeHandler(e.target.value, props.field.id)}
          value={props.value.value}
          placeholder={props.field.label}
        />
      </>
    );
  return null;
}

export default Text;
