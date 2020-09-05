import { Request, Response } from "express";
import db from "../database/connection";

import response from "../Utils/returnResponse";

export default class ConnectionsController {
  async index(req: Request, res: Response) {
    const totalConnections = await db("connections").count("* as total");
    const { total } = totalConnections[0];

    return response(res, 200, { total });
  }

  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    await db("connections").insert({
      user_id,
    });

    return response(res, 201, {});
  }
}
