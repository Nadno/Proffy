import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { apiPost } from "../../services/api";

import Input from "../../components/Input";
import Textarea from "../../components/Textarea";

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
    } catch (err) {
      alert('Não foi possível criar sua conta!');
    }
  };

  return (
    <div id="page-sign-up">
      <div id="page-sign-up-content">
        <div className="sign-in-title">
          <h1>
            Crie sua <br /> conta gratuíta
          </h1>
          <span>
            Basta preencher esses dados <br /> e você estará com nós.
          </span>
        </div>

        <div className="form-container">
          <form onSubmit={handleOnSubmit}>
            <fieldset>
              <legend>
                <h1>01. Quem é você?</h1>
              </legend>
              <Input
                label="Nome completo"
                name="name"
                value={account.name}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
              <Textarea
                name="bio"
                label="Biografia"
                value={account.bio}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
            </fieldset>

            <fieldset>
              <legend>
                <h1>02. Email e Senha</h1>
              </legend>
              <Input
                label="E-mail"
                name="email"
                type="email"
                value={account.email}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
              <Input
                label="Senha"
                name="password"
                type="password"
                value={account.password}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
              <Input
                label="Confirmar senha"
                name="password_confirmation"
                type="password"
                value={account.password_confirmation}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />
            </fieldset>

            <fieldset>
              <legend>
                <h1>03. Seus dados</h1>
              </legend>
              <Input
                name="avatar"
                label="Avatar"
                value={account.avatar}
                onChange={(e) => handleChangeInput(e.target.id, e.target.value)}
              />

              <Input
                name="whatsapp"
                label="Whatsapp"
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
