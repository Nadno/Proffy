import React from "react";

import Input from "../../components/Input";

import "./styles.css";

const SignUp = () => {
  return (
    <div id="page-signup">
      <div id="page-signup-content">
        <div className="signup-title">
          <h1>
            Crie sua <br /> conta gratuíta
          </h1>
          <span>
            Basta preencher esses dados <br /> e você estará conosco.
          </span>
        </div>

        <div className="form-container">
          <form>
            <fieldset>
              <legend>
                <h1>01. Quem é você?</h1>
              </legend>
              <Input label="Nome" name="name" />
              <Input label="Sobrenome" name="lastname" type="lastname" />
            </fieldset>

            <fieldset>
              <legend>
                <h1>02. Email e Senha</h1>
              </legend>
              <Input label="E-mail" name="email" type="email" />
              <Input label="Senha" name="password" type="password" />
            </fieldset>

            <button type="submit">Concluir cadastro</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
