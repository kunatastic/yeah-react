import React from "react";
import { InputFormProps } from "../../types/FormsTypes";

function Radio(props: InputFormProps) {
  if (props.field.kind === "RADIO" && props.field.meta.fieldType === "radio")
    return (
      <>
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <br />
        {(props.field.options as string[]).map((option, index) => {
          return (
            <React.Fragment key={index}>
              <input
                type={props.field.meta.fieldType}
                id={option}
                name={props.field.label}
                value={option}
                checked={props.value.value === option}
                onChange={(e) => props.onChangeHandler(e.target.value, props.field.id)}
              />
              <label> {option}</label>
              <br />
            </React.Fragment>
          );
        })}
      </>
    );
  else return null;
}

export default Radio;
