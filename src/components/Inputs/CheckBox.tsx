import React, { useEffect, useState } from "react";
import { InputFormProps } from "../../types/FormsTypes";

function CheckBox(props: InputFormProps) {
  const [selectedItems, setSelectedItems] = useState<string>("");

  useEffect(() => {
    if (props.field.kind === "DROPDOWN" && props.value.value !== undefined)
      setSelectedItems(props.value.value);
  }, [props.field.kind, props.value.value]);

  async function handleCheckboxField(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    const value = event.target.value;

    let changeData = selectedItems.split(",");
    if (isChecked) changeData.push(value);
    else changeData = changeData.filter((item) => item !== value);
    const changeDataStringified = changeData.join(",");
    props.onChangeHandler(changeDataStringified, props.field.id);
    setSelectedItems(changeDataStringified);
  }

  if (props.field.kind === "DROPDOWN" && props.field.meta.fieldType === "checkbox")
    return (
      <>
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <br />
        {(props.field.options as string[]).map((option, index) => {
          return (
            <React.Fragment key={index}>
              <input
                type={props.field.meta.fieldType}
                name={props.field.label}
                value={option}
                checked={selectedItems.includes(option)}
                onChange={(e) => handleCheckboxField(e)}
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

export default CheckBox;
