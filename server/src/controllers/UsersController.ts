import { Request, Response } from "express";
import db from "../database/connection";

import bcrypt from "bcrypt";

import {
  generateJwt,
  generateRefreshJwt,
  verifyRefreshJwt,
  getTokenFromHeaders,
} from "../Utils/jwt";

export interface IDecoded {
  id: number;
  version: number;
  iat: number;
  exp: number;
}

const ACCOUNT = [
  "id",
  "email",
  "name",
  "avatar",
  "whatsapp",
  "bio",
  "jwtVersion",
];

export default class UsersController {
  async create(req: Request, res: Response) {
    const { email, password, name, avatar, whatsapp, bio } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const emailAlreadyExists = await db("users")
      .select("users.email")
      .where("users.email", "=", email);

    if (emailAlreadyExists.length > 0) {
      return res.status(400).json("Esse email já está cadastrado!");
    }

    const insertedUsersIds = await db("users").insert({
      email,
      password: hash,
      name,
      avatar,
      whatsapp,
      bio,
    });

    const account = await db("users")
      .select(ACCOUNT)
      .where("users.id", "=", insertedUsersIds);
    const newAccount = account[0];

    const token = generateJwt({ id: newAccount.id });
    const refreshToken = generateRefreshJwt({
      id: newAccount.id,
      version: newAccount.jwtVersion,
    });

    return res.json({
      account,
      token,
      refreshToken,
    });
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await db("users").select(ACCOUNT).where("id", "=", id);
      if (user.length === 0) return res.json("Este usuário não existe!");

      return res.json(user[0]);
    } catch (err) {
      return res.status(500).json("Ocorreu um erro inesperado!");
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const bad_request = (message: string, status: number) =>
      res.json({
        ok: false,
        status,
        message: message,
      });

    const dbPassword = await db("users")
      .select("password")
      .where("email", "=", email);
    if (dbPassword.length === 0)
      return bad_request("Usuário ou senha inválidos!", 400);

    const match = bcrypt.compareSync(password, dbPassword[0].password);
    if (!match) return bad_request("Usuário ou senha inválidos!", 400);

    const dbAccount = await db("users")
      .select(ACCOUNT)
      .where("email", "=", email);

    const account = dbAccount[0];
    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({
      id: account.id,
      version: account.jwtVersion,
    });

    return res.json({
      status: 200,
      account,
      token,
      refreshToken,
    });
  }

  async update(req: Request, res: Response) {
    const { email, password, avatar, whatsapp, name, bio } = req.body;

    const dbPassword = await db("users")
      .select("password")
      .where("users.email", "=", email);

    const match = bcrypt.compareSync(password, dbPassword[0].password);
    if (!match) return res.status(400).json({ message: "Senha inválida!" });

    try {
      await db("users").where("users.email", "=", email).update({
        avatar,
        whatsapp,
        name,
        bio,
      });

      return res.json("Dados atualizados com sucesso!");
    } catch (err) {
      return res.json("Não foi possível atualizar seus dados!");
    }
  }

  async refresh(req: Request, res: Response) {
    const token = getTokenFromHeaders(req.headers);
    const unauthorized = (message: string) =>
      res.status(401).json({
        ok: false,
        status: 401,
        message: message,
      });

    if (!token) {
      return unauthorized("Token invalido!");
    }

    try {
      const decoded = <IDecoded>verifyRefreshJwt(token);
      const dbAccount = await db("users")
        .select(ACCOUNT)
        .where("id", "=", decoded.id);
      const account = dbAccount[0];

      if (!account) return unauthorized("Token invalido!");
      if (decoded.version !== account.jwtVersion)
        return unauthorized("Token invalido!");
      const meta = {
        token: generateJwt({ id: account.id }),
      };
      console.log("***Refresh!");
      return res.json(meta);
    } catch (err) {
      return unauthorized("Token invalido!");
    }
  }
}
