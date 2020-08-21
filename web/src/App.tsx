import React from "react";
import Routes from "./routes";

import { AuthProvider } from "./store";

import "./assets/styles/global.css";

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Routes />
      </div>
    </AuthProvider>
  );
};

export default App;
