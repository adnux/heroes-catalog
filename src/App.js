import { Router } from "@reach/router";
import React from "react";
import "./App.css";
import Details from "./screens/details";
import List from "./screens/list";

function App() {
  return (
    <div className="App">
      HehoresApp
      <Router>
        <List path="/" />
        <Details path="hero/:id" />
      </Router>
    </div>
  );
}

export default App;
