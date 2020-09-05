"use strict";

import { Request, Response, NextFunction } from "express";

import { IDecoded } from "../controllers/UsersController";
import { verifyJwt, getTokenFromHeaders } from "../Utils/jwt";
import response from "../Utils/returnResponse";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const { url: path } = req;

  const excludePaths = [
    "/users/sign-in",
    "/users/sign-up",
    "/refresh",
    "/classes/list",
    "/connections",
  ];
  const isExcluded = !!excludePaths.find((p) => path.includes(p));
  if (isExcluded) return next();

  let token = getTokenFromHeaders(req.headers);
  if (!token) return response(res, 401, { message: "token invalido!" });

  try {
    const decoded = <IDecoded>verifyJwt(token);
    res.locals = {
      ...res.locals,
      session: decoded.id,
    };

    next();
  } catch (err) {
    return response(res, 401, { message: "token invalido!" });
  }
};

export default checkJwt;
