import React from "react";

import Container from "./components/Container";
import Form from "./components/Form";
import Header from "./components/Header";
import { FormFields } from "./data/FormField";

import logo from "./logo.svg";

function App() {
  return (
    <Container>
      <div className="px-8 py-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="WOW Welcome to the level5" />
        <Form FormFields={FormFields} />
      </div>
    </Container>
  );
}

export default App;
