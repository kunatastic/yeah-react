import React from "react";
import { previewFieldProps } from "../types/CommonTypes";

import Text from "./Inputs/Text";
import Radio from "./Inputs/Radio";
import CheckBox from "./Inputs/CheckBox";
import Select from "./Inputs/Select";
import MultiSelect from "./Inputs/MultiSelect";

function PreviewField(props: previewFieldProps) {
  const { field, onChangeHandler } = props;
  return (
    <div className="pt-4">
      {/* TEXT KIND */}
      <Text field={field} onChangeHandler={onChangeHandler} />
      {/* DROPDOWN KIND */}
      <Radio field={field} onChangeHandler={onChangeHandler} />
      <Select field={field} onChangeHandler={onChangeHandler} />
      {/* MULTISELECT KIND */}
      <CheckBox field={field} onChangeHandler={onChangeHandler} />
      <MultiSelect field={field} onChangeHandler={onChangeHandler} />
    </div>
  );
}

export default PreviewField;
