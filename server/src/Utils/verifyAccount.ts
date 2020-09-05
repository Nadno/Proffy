import { Response } from "express";
import db from "../database/connection";
import response from "./returnResponse";
import bcrypt from "bcrypt";

interface Account {
  email: string;
  password: string;
};

const verifyAccount = async (
  res: Response,
  select: Array<string>,
  { email, password }: Account
) => {
  const ERRO_IN_ACCOUNT = "Usuário ou senha inválidos!";
  const DB_USERS = "users";
  const EMAIL = "email";

  const account = await db(DB_USERS)
    .select(select)
    .where(EMAIL, "=", email);
  if (account.length === 0)
    return { ok: false, account, ERRO_IN_ACCOUNT};

  const match = bcrypt.compareSync(password, account[0].password);

  return { ok: match, account, ERRO_IN_ACCOUNT };
};

export default verifyAccount;
