import React from "react";
import { InputFormField } from "../../types/forms";

function Text(props: {
  field: InputFormField;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}) {
  if (props.field.kind === "text")
    return (
      <>
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <input
          className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
          type={props.field.type}
          onChange={(e) => props.onChangeHandler(e, props.field.id)}
          value={props.field.value}
        />
      </>
    );
  return null;
}

export default Text;
