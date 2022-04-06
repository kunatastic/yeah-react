import React, { useState } from "react";

import Form from "./components/Form";
import Home from "./components/Home";
import List from "./components/List";
import Result from "./components/Result";
import { formFields as initialFormField } from "./data/FormField";
import { IFormData } from "./types/forms";

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
