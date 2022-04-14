import React, { useEffect, useState } from "react";
import { inputTypes } from "../../types/FormsTypes";

function SearchBox(props: {
  field: inputTypes;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, id: string, data: string[]) => void;
}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDropDown, setShowDropDown] = useState<Boolean>(false);

  useEffect(() => {
    if (props.field.kind === "DROPDOWN" && props.field.value !== undefined)
      setSelectedItems(props.field.value);
  }, [props.field.kind, props.field.value]);

  async function handleDropDownClick(value: string) {
    let changeData = [...selectedItems];
    if (changeData.includes(value)) changeData = changeData.filter((item) => item !== value);
    else changeData.push(value);
    props.onChangeHandler({} as never, props.field.id, changeData);
    setSelectedItems(changeData);
  }

  if (props.field.kind === "DROPDOWN" && props.field.fieldType === "multiple")
    return (
      <>
        <label className="text-gray-900 font-semibold py-2">{props.field.label}</label>
        <br />
        <h1 className="font-xl my-2 flex justify-between items-center">
          {selectedItems.length === 0 ? <>No items selected</> : <>{selectedItems.join(", ")}</>}
          <button
            onClick={() => setShowDropDown(!showDropDown)}
            className="mx-5 py-2 px-4 bg-gray-200"
          >
            {showDropDown ? "Hide 🔼" : "Show 🔽"}
          </button>
        </h1>

        {showDropDown && (
          <>
            <div className="h-48 overflow-auto scroll bg-gray-200">
              {props.field.options.map((option, index) => (
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

export default SearchBox;
