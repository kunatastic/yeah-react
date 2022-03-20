import React, { useState } from "react";

import Container from "./components/Container";
import Form from "./components/Form";
import Header from "./components/Header";
import Home from "./components/Home";
import List from "./components/List";
import Result from "./components/Result";
import { formFields as initialFormField } from "./data/FormField";
import { IFormData, IFormField } from "./types/forms";

function App() {
  const [state, setState] = useState<string>("HOME");
  const [results, setResults] = useState<IFormField[]>([]);

  const [initialFormData, setInitialFormData] = useState<IFormData>({
    id: new Date().getTime().toString(36),
    title: "Untitled",
    formfields: initialFormField,
  });

  function changeState(state: string) {
    setState(state);
  }

  return (
    <>
      {state === "HOME" && <Home />}
      {state === "FORM" && <Form formId={initialFormData.id} />}
      {state === "RESULT" && <Result formId={initialFormData.id} />}
      {state === "LIST" && <List />}
    </>
  );
}

export default App;
