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
    id: Number(new Date()),
    title: "Untitled",
    formfields: initialFormField,
  });

  function changeState(state: string) {
    setState(state);
  }

  function showResults(results: IFormField[]) {
    changeState("RESULT");
    setResults(results);
  }

  function loadFormData(initialFormData: IFormData) {
    setInitialFormData(initialFormData);
    changeState("FORM");
  }

  return (
    <Container>
      <div className="px-8 py-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="WOW Welcome to the level5" />
        {state === "HOME" && <Home changeStateCB={changeState} />}
        {state === "FORM" && (
          <Form
            changeStateCB={changeState}
            showResultsCB={showResults}
            initialLoadedData={initialFormData}
          />
        )}
        {state === "RESULT" && <Result results={results} />}
        {state === "LIST" && <List loadFormCB={loadFormData} />}
      </div>
    </Container>
  );
}

export default App;
