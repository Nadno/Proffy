import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import TeacherList from "./pages/TeacherList";
import TeacherForm from "./pages/TeacherForm";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </BrowserRouter>
  );
};

export default Routes;
