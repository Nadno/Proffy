import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { apiPost } from "../../services/api";

import SignLogo from "../../components/SignLogo";
import Textarea from "../../components/Textarea";
import Input from "../../components/Input";

import "./styles.css";

const SignUp = () => {
  const history = useHistory();
  const [account, setAccount] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
    whatsapp: "",
    bio: "",
    avatar: "",
  });

  const handleChangeInput = (name: string, value: string) =>
    setAccount({
      ...account,
      [name]: value,
    });

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await apiPost('/users/sign-up', account);
      history.push('/sign-in');
    } catch {
      alert('Não foi possível criar sua conta!');
    }
  };

  return (
    <div id="page-sign-up">
      <div id="page-sign-up-content">
        <SignLogo />

        <div className="form-container">
          <form onSubmit={handleOnSubmit}>
            <fieldset>
              <legend>
                <h1>01. Quem é você?</h1>
              </legend>
              <Input
                name="name"
                value={account.name}
                placeholder="Nome completo"
                className="first"
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
              <Textarea
                name="bio"
                placeholder="Biografia"
                className="last"
                value={account.bio}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
            </fieldset>

            <fieldset>
              <legend>
                <h1>02. Email e Senha</h1>
              </legend>
              <Input
                name="email"
                type="email"
                placeholder="E-mail"
                className="first"
                value={account.email}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                value={account.password}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
              <Input
                name="password_confirmation"
                type="password"
                placeholder="Confirmar senha"
                className="last"
                value={account.password_confirmation}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
            </fieldset>

            <fieldset>
              <legend>
                <h1>03. Outros dados</h1>
              </legend>
              <Input
                name="avatar"
                placeholder="Avatar"
                className="first"
                value={account.avatar}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />

              <Input
                name="whatsapp"
                placeholder="Whatsapp"
                className="last"
                value={account.whatsapp}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
            </fieldset>

            <button type="submit">Concluir cadastro</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
