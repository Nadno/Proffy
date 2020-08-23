import React from "react";
import { Link } from "react-router-dom";



const Sign = () => {
  return (
    <div className="sign">
      <Link to="/sign-in">Faça seu login!</Link>
      <Link to="/sign-up">Cadastre-se</Link>
    </div>
  );
};

export default Sign;
