import { Request, Response } from "express";
import db from "../database/connection";

import bcrypt from "bcrypt";

export default class UsersController {
  async create(req: Request, res: Response) {
    const { email, password, name, avatar, whatsapp, bio } = req.body;

    const hash = bcrypt.hashSync(password, 10);
    const trx = await db.transaction();

    try {
      const emailAlredyExists = await trx("users")
        .select("users.email")
        .where("users.email", "=", email);

      if (emailAlredyExists)
        return res.status(400).json("Esse email já está cadastrado!");

      const insertedUsersIds = await trx("users").insert({
        email,
        password: hash,
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];
      trx.commit();

      return res.json({ message: user_id });
    } catch (err) {
      console.log(err);
    }
  }

  async index(req: Request, res: Response) {
    const { email, password } = req.body;

    const trx = await db.transaction();

    try {
      const dbPassword = await trx("users")
        .select("password")
        .where("email", "=", email)
        .from("users");

      const match = bcrypt.compareSync(password, dbPassword[0].password);

      if (!match) return res.status(400).json({ message: "Senha inválida!" });

      const user = await trx("users").select("*").where("email", "=", email);

      return res.json({
        message: "Succes signin!",
        user: user[0],
      });
    } catch (err) {
      return res.json({ messsage: err });
    }
  }
}
