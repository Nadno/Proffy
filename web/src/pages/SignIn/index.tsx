import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import { apiPost } from "../../services/api";

import { setToken, setRefreshToken, setAccount } from "../../Utils/account";
import handlingFormResponse from "../../Utils/handlingResponses";

import Input from "../../components/Input";
import SignLogo from "../../components/SignLogo";
import FormError from "../../components/FormError";

import "./styles.css";

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
      .then((res) => {
        if (!res.account) return setError(res);

        const account = res.account ? res.account : null;
        const token = res.token ? res.token : null;
        const refreshToken = res.refreshToken ? res.refreshToken : null;

        setAccount(account);
        setToken(token);
        setRefreshToken(refreshToken);

        history.push("/");
        history.go(0);
      }).catch(() => {
        setError("Falha ao se conectar com o servidor!")
      });
  };

  return (
    <div id="page-sign-in">
      <div id="page-sign-in-content">
        <SignLogo />

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                <h1>Fazer login</h1>
                <Link to="/sign-up">Criar uma conta</Link>
              </legend>
              <Input
                name="email"
                type="email"
                placeholder="E-mail"
                value={newAccount.email}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              />
              <Input
                name="password"
                type="password"
                placeholder="Senha"
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
