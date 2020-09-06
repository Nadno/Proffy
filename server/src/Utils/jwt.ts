import { IncomingHttpHeaders } from "http";

import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();

const jwt = jsonwebtoken;

const tokenPrivateKey = String(process.env.JWT_TOKEN_PRIVATE_KEY);
const refreshTokenPrivateKey = String(process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY);

const options = { expiresIn: '30 minutes' };
const refreshOptions = { expiresIn: '30 days' };

interface Payload {
  id: number,
  version?: number,
}

const generateJwt = (payload: Payload) => jwt.sign(payload, tokenPrivateKey, options);
const generateRefreshJwt = (payload: Payload) => jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);


const verifyJwt = (token: string) => jwt.verify(token, tokenPrivateKey);
const verifyRefreshJwt = (token: string) => jwt.verify(token, refreshTokenPrivateKey);

const getTokenFromHeaders = (headers: IncomingHttpHeaders) => {
  const token = headers["authorization"]; 

  return token ? token.slice(7, token.length) : null;
};

export {
  generateJwt,
  generateRefreshJwt,
  verifyJwt,
  verifyRefreshJwt,
  getTokenFromHeaders
};