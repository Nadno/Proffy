import { Response } from "express";

const response = (res: Response, code: number, content: object) => {
  return res.status(code).json(content);
};

export default response;
