import React from "react";
import { previewFieldProps } from "../types/CommonTypes";

import Text from "./Inputs/Text";
import Radio from "./Inputs/Radio";
import CheckBox from "./Inputs/CheckBox";
import Select from "./Inputs/Select";
import MultiSelect from "./Inputs/MultiSelect";

function PreviewField(props: previewFieldProps) {
  const { field, onChangeHandler, value } = props;
  if (value !== undefined)
    return (
      <>
        <div className="pt-4">
          {/* TEXT KIND */}
          <Text field={field} onChangeHandler={onChangeHandler} value={value} />
          {/* DROPDOWN KIND */}
          <Radio field={field} onChangeHandler={onChangeHandler} value={value} />
          <Select field={field} onChangeHandler={onChangeHandler} value={value} />
          {/* MULTISELECT KIND */}
          <CheckBox field={field} onChangeHandler={onChangeHandler} value={value} />
          <MultiSelect field={field} onChangeHandler={onChangeHandler} value={value} />
        </div>
      </>
    );
  return null;
}

export default PreviewField;
