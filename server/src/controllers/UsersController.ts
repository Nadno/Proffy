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
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_SERVER_ERROR = 500;

const INVALID_TOKEN = "Token invalido!";

export default class UsersController {
  async create(req: Request, res: Response) {
    const { email, password, name, avatar, whatsapp, bio } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const emailAlreadyExists = await db("users")
      .select("users.email")
      .where("users.email", "=", email);

    if (emailAlreadyExists.length > 0) {
      return response(res, STATUS_CODE_BAD_REQUEST, {
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

    return response(res, STATUS_CODE_OK, {
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
        return response(res, STATUS_CODE_BAD_REQUEST, {
          message: "Este usuário não existe!",
        });

      return response(res, STATUS_CODE_OK, { user: user[0] });
    } catch (err) {
      return response(res, STATUS_CODE_SERVER_ERROR, {
        message: "Ocorreu um erro inesperado!",
      });
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const SELECT = ["password", "id"];

    const dbAccount = await db("users")
      .select(ACCOUNT)
      .where("email", "=", email);

    const verify = await verifyAccount(SELECT, { email, password });
    if (!verify.ok)
      return response(res, STATUS_CODE_BAD_REQUEST, {
        message: verify.ERRO_IN_ACCOUNT,
      });

    const account = dbAccount[0];
    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({
      id: account.id,
      version: account.jwtVersion,
    });

    return response(res, STATUS_CODE_OK, {
      account,
      token,
      refreshToken,
    });
  }

  async update(req: Request, res: Response) {
    const { email, password, avatar, whatsapp, name, bio } = req.body;
    const SELECT = ["password"];

    const verify = await verifyAccount(SELECT, { email, password });
    if (!verify.ok)
      return response(res, STATUS_CODE_BAD_REQUEST, {
        message: verify.ERRO_IN_ACCOUNT,
      });

    try {
      await db("users").where("users.email", "=", email).update({
        avatar,
        whatsapp,
        name,
        bio,
      });

      return response(res, STATUS_CODE_OK, {
        message: "Dados atualizados com sucesso!",
      });
    } catch (err) {
      return response(res, STATUS_CODE_SERVER_ERROR, {
        message:
          "Não foi possível atualizar seus dados! Tente novamente mais tarde.",
      });
    }
  }

  async refresh(req: Request, res: Response) {
    const token = getTokenFromHeaders(req.headers);

    if (!token)
      return response(res, STATUS_CODE_UNAUTHORIZED, {
        message: INVALID_TOKEN,
      });

    try {
      const decoded = <IDecoded>verifyRefreshJwt(token);
      const dbAccount = await db("users")
        .select(ACCOUNT)
        .where("id", "=", decoded.id);
      const account = dbAccount[0];

      if (!account)
        return response(res, STATUS_CODE_UNAUTHORIZED, {
          message: INVALID_TOKEN,
        });
      if (decoded.version !== account.jwtVersion)
        return response(res, STATUS_CODE_UNAUTHORIZED, {
          message: INVALID_TOKEN,
        });
      const meta = {
        token: generateJwt({ id: account.id }),
      };
    
      return res.json(meta);
    } catch (err) {
      return response(res, STATUS_CODE_UNAUTHORIZED, {
        message: INVALID_TOKEN,
      });
    }
  }
}
