import React, { useEffect, useState } from "react";
import { InputFormField } from "../../types/forms";

function CheckBox(props: {
  field: InputFormField;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string, data: string[]) => void;
}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (props.field.kind === "multiselect") setSelectedItems(props.field.value);
  }, [props.field.kind, props.field.value]);

  async function handleCheckboxField(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    const value = event.target.value;
    let changeData = [...selectedItems];
    if (isChecked) {
      changeData.push(value);
    } else {
      changeData = changeData.filter((item) => item !== value);
    }
    props.onChangeHandler(event, props.field.id, changeData);
    setSelectedItems(changeData);
  }

  if (props.field.kind === "multiselect" && props.field.type === "checkbox")
    return (
      <>
        {console.log("WOWOW: ", props.field.value, selectedItems)}
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <br />
        {props.field.options.map((option, index) => {
          return (
            <React.Fragment key={index}>
              <input
                type={props.field.type}
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
