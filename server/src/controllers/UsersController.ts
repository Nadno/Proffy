import { Request, Response } from "express";
import db from "../database/connection";

import bcrypt from "bcrypt";

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

    const user_id = insertedUsersIds[0];

    return res.json({ message: user_id });
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

    const match = bcrypt.compareSync(password, dbPassword[0].password);

    if (!match) return res.status(400).json({ message: "Senha inválida!" });

    const user = await db("users").select("*").where("email", "=", email);

    return res.json({
      message: "Succes signin!",
      user: user[0],
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
    };
  }
}
