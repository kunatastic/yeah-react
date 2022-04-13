import React from "react";
import { InputFormProps } from "../../types/FormsTypes";

function Radio(props: InputFormProps) {
  if (props.field.kind === "RADIO" && props.field.fieldType === "radio")
    return (
      <>
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <br />
        {props.field.options.map((option, index) => {
          return (
            <React.Fragment key={index}>
              <input
                type={props.field.fieldType}
                id={option}
                name={props.field.label}
                value={option}
                checked={props.field.value === option}
                onChange={(e) =>
                  props.onChangeHandler(e.target.value, props.field.id, props.field.kind)
                }
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
