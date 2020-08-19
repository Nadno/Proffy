import { Request, Response } from "express";
import db from "../database/connection";

import bcrypt from "bcrypt";

import {
  generateJwt,
  generateRefreshJwt,
  verifyRefreshJwt,
  getTokenFromHeaders,
} from "../Utils/jwt";

interface IDecoded {
  id: number;
  version: number;
  iat: number;
  exp: number;
}

export default class UsersController {
  async create(req: Request, res: Response) {
    const { email, password, name, avatar, whatsapp, bio } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const emailAlredyExists = await db("users")
      .select("users.email")
      .where("users.email", "=", email);

    if (emailAlredyExists.length > 0) {
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

    const dbNewAccount = await db("users")
      .select("id", "email", "name", "avatar", "whatsapp", "bio", "jwtVersion")
      .where("users.id", "=", insertedUsersIds);
    const account = dbNewAccount[0];

    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({ id: account.id , version: account.jwtVersion })

    return res.json({ 
      account
    });
  }

  async index(req: Request, res: Response) {
    const { id } = req.params;

    const user = await db("users")
      .select("name", "avatar", "whatsapp", "bio")
      .where("users.id", "=", id);
    if (user.length === 0) return res.json("Este usuário não existe!");

    return res.json(user);
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const dbPassword = await db("users")
      .select("password")
      .where("email", "=", email);
    if (dbPassword.length === 0) return res.json("Usuário ou senha inválidos!");

    const match = bcrypt.compareSync(password, dbPassword[0].password);
    if (!match) return res.status(400).json("Usuário ou senha inválidos!");

    const dbAccount = await db("users").select("*").where("email", "=", email);
    const account = dbAccount[0];

    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({
      id: account.id,
      version: account.jwtVersion,
    });

    return res.json({
      message: "Succes signin!",
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

  async resfresh(req: Request, res: Response) {
    const token = String(getTokenFromHeaders(req.headers));
    console.log("***Token:", token);
    if (!token) return res.status(401).send("Token invalido!");

    try {
      const decoded = <IDecoded>verifyRefreshJwt(token);
      const dbAccount = await db("users").select("*").where("users.id", "=", decoded.id);
      const account = dbAccount[0];
      
      if (!account) return res.status(401).send("Token invalido!");
      if (decoded.version !== account.jwtVersion) {
        return res.status(401).send("Token invalido!");
      };

      const meta = {
        token: generateJwt({ id: account.id }),
      };

      return res.json(meta);
    } catch (err) { 
      return res.status(401).send("Token invalido!");
    }
  }
}
