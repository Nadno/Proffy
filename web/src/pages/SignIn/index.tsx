import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import { apiPost } from "../../services/api";

import Input from "../../components/Input";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";
import handlingFormResponse from "../../Utils/handlingResponses";
import FormError from "../../components/FormError";
import { setToken, setRefreshToken, setAccount } from "../../Utils/account";

const SignIn = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState({
    email: "",
    password: "",
  });

  const handleChange = (value: string, name: string) => {
    setNewAccount({
      ...newAccount,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await apiPost("/users/sign-in", newAccount)
      .then(handlingFormResponse)
      .then(res => {
        if (!res.account) return setError(res);

        const account = res.account ? res.account : null;
        const token = res.token ? res.token : null;
        const refreshToken = res.refreshToken ? res.refreshToken : null;

        setAccount(account);
        setToken(token);
        setRefreshToken(refreshToken);

        history.push('/');
        history.go(0);
      });
  };

  return (
    <div id="page-sign-in">
      <div id="page-sign-in-content">
        <div className="logo-container">
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <img src={logoImg} alt="Proffy Logo" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                <h1>Fazer login</h1>
                <Link to="/sign-up">Criar uma conta</Link>
              </legend>
              <Input
                label="E-mail"
                name="email"
                type="email"
                value={newAccount.email}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              />
              <Input
                label="Senha"
                name="password"
                type="password"
                value={newAccount.password}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              /> 
            </fieldset>
            <FormError error={error} />
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
