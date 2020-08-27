import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const Sign = () => {
  return (
    <>
      <div></div>
      <div id="sign">
        <Link to="/sign-in">Signin</Link>
        <Link to="/sign-up">Signup</Link>
      </div>
    </>
  );
};

export default Sign;
