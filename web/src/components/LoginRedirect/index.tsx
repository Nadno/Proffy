import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

const LoginRedirect = () => {
  const history = useHistory();

  const redirectToSingIn = () => history.push("/sign-in");
  const redirectToHome = () => history.push("/");

  return (
    <div id="redirect">
      <span>Para acessar esta pagina você precisa estar logado!</span>

      <div className="buttons">
        <button type="button" onClick={redirectToSingIn}>
          Entrar
        </button>
        <button type="button" onClick={redirectToHome}>
          Voltar para home
        </button>
      </div>
    </div>
  );
};

export default LoginRedirect;
