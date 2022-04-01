import React from "react";
import { InputFormField } from "../../types/forms";

function Radio(props: {
  field: InputFormField;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}) {
  if (props.field.kind === "dropdown" && props.field.type === "radio")
    return (
      <>
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <br />
        {props.field.options.map((option, index) => {
          return (
            <>
              <input
                type={props.field.type}
                id={option}
                name={props.field.label}
                value={option}
                checked={props.field.value === option}
                onChange={(e) => props.onChangeHandler(e, props.field.id)}
              />
              <label> {option}</label>
              <br />
            </>
          );
        })}
      </>
    );
  else return null;
}

export default Radio;
