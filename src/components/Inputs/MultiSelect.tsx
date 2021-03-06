import React, { useEffect, useState } from "react";
import { InputFormProps } from "../../types/FormsTypes";

function MultiSelect(props: InputFormProps) {
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string>("");

  useEffect(() => {
    if (props.field.kind === "DROPDOWN" && props.value.value !== undefined)
      setSelectedItems(props.value.value);
  }, [props.field.kind, props.value.value]);

  async function handleDropDownClick(value: string) {
    let changeData = selectedItems.split(",");
    if (changeData.includes(value)) changeData = changeData.filter((item) => item !== value);
    else changeData.push(value);
    const changeDataStringified = changeData.join(",");
    props.onChangeHandler(changeDataStringified, props.field.id);
    setSelectedItems(changeDataStringified);
  }

  if (props.field.kind === "DROPDOWN" && props.field.meta.fieldType === "multiple")
    return (
      <>
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <br />
        <h1 className="font-xl my-2 flex justify-between items-center">
          {selectedItems.length === 0 ? <>No items selected</> : <>{selectedItems}</>}
          <button
            onClick={() => setShowDropDown(!showDropDown)}
            className="mx-5 py-2 px-4 bg-gray-200"
          >
            {showDropDown ? "Hide 🔼" : "Show 🔽"}
          </button>
        </h1>

        {showDropDown && (
          <>
            <div className="h-48 overflow-auto scroll bg-gray-50">
              {(props.field.options as string[]).map((option, index) => (
                <div
                  key={index}
                  className={`${
                    selectedItems.includes(option)
                      ? "bg-blue-400 hover:bg-blue-500"
                      : "bg-blue-200 hover:bg-blue-300"
                  } p-2 my-2 rounded-sm hover:shadow-xl mx-4  cursor-pointer`}
                  onClick={(e) => handleDropDownClick(option)}
                >
                  <span className="text-center">{option}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  else return null;
}

export default MultiSelect;
