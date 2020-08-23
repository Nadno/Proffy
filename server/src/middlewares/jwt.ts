"use strict";

import { Request, Response, NextFunction } from "express";

import { verifyJwt, getTokenFromHeaders } from "../Utils/jwt";
import { IDecoded } from "../controllers/UsersController";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const { url: path } = req;

  const excludePaths = [
    "/users/sign-in",
    "/users/sign-up",
    "/classes/list",
    "/connections",
  ];
  const isExcluded = !!excludePaths.find((p) => path.includes(p));

  if (isExcluded) return next();
  const unauthorized = (message: string) =>
    res.status(401).json({
      ok: false,
      status: 401,
      message: message,
    });

  let token = getTokenFromHeaders(req.headers);
  if (!token) return unauthorized("token invalido!");

  try {
    const decoded = <IDecoded>verifyJwt(token);
    res.locals = {
      ...res.locals,
      session: decoded.id,
    };

    next();
  } catch (err) {
    return unauthorized("token invalido!");
  }
};

export default checkJwt;
