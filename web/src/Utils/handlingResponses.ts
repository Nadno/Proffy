import { AxiosResponse } from "axios";

const INVALID_PASS_CONFIRM = "any.only";
const INVALID_EMAIL = "string.email";
const INVALID = "string.pattern.base";
const EMPTY = "empty";

const invalidMessages = {
  password: "A senha precisa ter entre 3 e 30 caracteres, e não pode conter caracteres especiais.",
  whatsapp: "Número de telefone inválido",
};

const handlingFormResponse = (res: AxiosResponse) => {
  const { data } = res;
  if (data.status === 200) return data;

  switch (data.message) {
    case INVALID_EMAIL:
      return "E-mail invalido.";
    case INVALID: {    
      return data.field === "password"
      ? invalidMessages.password
      : invalidMessages.whatsapp;
    }

    case INVALID_PASS_CONFIRM:
      return {
        field: "password_confirmation",
        error: "A senhas não coincidem.",
      };

    default: {
      if (data.message.includes(EMPTY)) {
        return "Preencha todos os campos!";
      }
      return data.message;
    }
  }
};

export default handlingFormResponse;
