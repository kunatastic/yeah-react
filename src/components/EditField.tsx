import React, { useState } from "react";
import { resultType } from "../types/ApiTypes";
import { removeField, updateField } from "../util/ApiUtils";
import Modal from "./common/Modal";
import NewField from "./NewField";
import UpdateField from "./UpdateField";

function EditField(props: { fieldInfo: resultType; formId: string }) {
  const [updateField, setUpdateField] = useState<boolean>(false);
  const { fieldInfo, formId } = props;

  async function removeFieldHandler() {
    const data = await removeField(formId, fieldInfo.id);
    console.log(data);
    document.location.reload();
  }

  const [error, setError] = useState<{ [key: string]: boolean }>({
    error1: false,
    error2: false,
    error3: false,
  });

  return (
    <div className="pt-4">
      <div className="flex justify-between bg-gray-100 p-2">
        <Modal open={updateField} onCloseCB={() => setUpdateField(false)}>
          <UpdateField
            formId={formId}
            initialData={fieldInfo}
            onCloseCB={() => setUpdateField(false)}
          />
        </Modal>

        <label className="text-gray-900 font-semibold py-2">
          {fieldInfo.label} (
          <span className="text-blue-700 font-semibold py-2 capitalize">
            {fieldInfo.meta.fieldType}
          </span>
          )
        </label>

        <div>
          <button
            className="text-black border-2 border-transparent  hover:border-red-600 bg-gray-200 mx-2 px-4 py-2 rounded-lg hover:bg-gray-300"
            onClick={() => {
              setUpdateField(!updateField);
            }}
            type="button"
          >
            Update Field
          </button>
          <button
            className="text-black border-2 border-transparent  hover:border-red-600 bg-gray-200 mx-2 px-4 py-2 rounded-lg hover:bg-gray-300"
            onClick={removeFieldHandler}
            type="button"
          >
            Remove Field
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditField;
