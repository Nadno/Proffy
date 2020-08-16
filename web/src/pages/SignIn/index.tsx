import React from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";

const SignIn = () => {
  return (
    <div id="page-signin">
      <div id="page-signin-content">
        <div className="logo-container">
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <img src={logoImg} alt="Proffy Logo" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <div className="form-container">
          <form>
            <fieldset>
              <legend>
                <h1>Fazer login</h1>
                <Link to="/signup">Criar uma conta</Link>
              </legend>
              <Input label="E-mail" name="email" type="email" />
              <Input label="Senha" name="password" type="password" />
            </fieldset>

            <fieldset>
              <label htmlFor="lembrar-me">
                <input id="lembrar-me" name="lembrar-me" type="checkbox" />
                Lembrar-me
              </label>
              <Link to="/">Esqueci minha senha</Link>
            </fieldset>

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
