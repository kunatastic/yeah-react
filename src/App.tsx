import React, { useState } from "react";

import Form from "./components/pages/Form";
import Home from "./components/pages/Home";
import List from "./components/pages/List";
import Result from "./components/pages/Result";
import { formFields as initialFormField } from "./data/FormFieldData";
import { IFormData } from "./types/FormsTypes";

function App() {
  const [state, setState] = useState<string>("HOME");

  return (
    <>
      {state === "HOME" && <Home />}
      {/* {state === "FORM" && <Form formId={initialFormData.id} />}
      {state === "RESULT" && <Result formId={initialFormData.id} />} */}
      {state === "LIST" && <List />}
    </>
  );
}

export default App;
