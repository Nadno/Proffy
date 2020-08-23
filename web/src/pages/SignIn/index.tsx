import React, { useState, useContext, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import { AxiosResponse } from "axios";
import { apiPost } from "../../services/api";

import { UserContext } from '../../store';

import Input from "../../components/Input";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";

const SignIn = () => {
  const AuthProvider = useContext(UserContext);
  const history = useHistory();

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const handleChange = (value: string, name: string) => {
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const dataDestructing = (res: AxiosResponse) => {
    AuthProvider?.handleLogin(res.data);
    history.push("/study");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    apiPost('/users/sign-in', account)
    .then(dataDestructing);
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
                value={account.email}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              />
              <Input
                label="Senha"
                name="password"
                type="password"
                value={account.password}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              />
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
