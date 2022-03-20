import React, { useState } from "react";

import Container from "./components/Container";
import Form from "./components/Form";
import Header from "./components/Header";
import Home from "./components/Home";
import Result from "./components/Result";
import { IFormFields } from "./types/forms";

function App() {
  const [state, setState] = useState<string>("HOME");
  const [results, setResults] = useState<IFormFields[]>([]);

  function closeForm() {
    setState("HOME");
  }

  function openForm() {
    setState("FORM");
  }

  function showResults(results: IFormFields[]) {
    setState("RESULT");
    setResults(results);
  }

  return (
    <Container>
      <div className="px-8 py-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="WOW Welcome to the level5" />
        {state === "HOME" && <Home openFormCB={openForm} />}
        {state === "FORM" && <Form closeFormCB={closeForm} showResultsCB={showResults} />}
        {state === "RESULT" && <Result results={results} />}
      </div>
    </Container>
  );
}

export default App;
