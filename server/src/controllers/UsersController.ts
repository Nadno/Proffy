import { Request, Response } from "express";
import db from "../database/connection";

import bcrypt from "bcrypt";

import {
  generateJwt,
  generateRefreshJwt,
  verifyRefreshJwt,
  getTokenFromHeaders,
} from "../Utils/jwt";
import response from "../Utils/returnResponse";
import verifyAccount from "../Utils/verifyAccount";

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
const INVALID_TOKEN = "Token invalido!";

export default class UsersController {
  async create(req: Request, res: Response) {
    const { email, password, name, avatar, whatsapp, bio } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const emailAlreadyExists = await db("users")
      .select("users.email")
      .where("users.email", "=", email);

    if (emailAlreadyExists.length > 0) {
      return res.status(400).json({
        message: "Esse email já está cadastrado!",
      });
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
      if (user.length === 0)
        return res.json({
          message: "Este usuário não existe!",
        });

      return res.json(user[0]);
    } catch (err) {
      return res.status(500).json({
        message: "Ocorreu um erro inesperado!",
      });
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

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
    const SELECT = ["password"];

    const verify = await verifyAccount(res, SELECT, { email, password });
    if (!verify.ok) return response(res, 400, { message: verify.ERRO_IN_ACCOUNT });

    try {
      await db("users").where("users.email", "=", email).update({
        avatar,
        whatsapp,
        name,
        bio,
      });

      return response(res, 200, {
        message: "Dados atualizados com sucesso!",
      });
    } catch (err) {
      return response(res, 500, {
        message:
          "Não foi possível atualizar seus dados! Tente novamente mais tarde.",
      });
    }
  };

  async refresh(req: Request, res: Response) {
    const token = getTokenFromHeaders(req.headers);

    if (!token) return response(res, 401, { message: INVALID_TOKEN });

    try {
      const decoded = <IDecoded>verifyRefreshJwt(token);
      const dbAccount = await db("users")
        .select(ACCOUNT)
        .where("id", "=", decoded.id);
      const account = dbAccount[0];

      if (!account) return response(res, 401, { message: INVALID_TOKEN });
      if (decoded.version !== account.jwtVersion)
        return response(res, 401, { message: INVALID_TOKEN });
      const meta = {
        token: generateJwt({ id: account.id }),
      };
      console.log("***Refresh!");
      return res.json(meta);
    } catch (err) {
      return response(res, 401, { message: INVALID_TOKEN });
    }
  }
}
