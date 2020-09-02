import { apiRefreshToken } from "../services/api";

import { getToken, getRefreshToken, setToken } from "./account";
import { getTokenExpire } from "./jwt";

const calculate = (token: string) => {
  const expires = getTokenExpire(token);
  const secondsToExpire = expires - Date.now() / 1000;

  return secondsToExpire;
};

const verifyExpireToken = async () => {
  const token = getToken();
  const refreshToken = getRefreshToken();
  const secondsToExpireToken = calculate(token);
  const secondsToExpireRefreshToken = calculate(refreshToken);

  let itsOk = true;
  
  if (secondsToExpireToken <= 60) {
    if (secondsToExpireRefreshToken <= 60) return false;
    await apiRefreshToken(refreshToken)
      .then((res) => {
        setToken(res.data.token);
      })
      .catch(() => console.error("Falha ao se conectar com o servidor"));
  };
  
  return itsOk;
};

export default verifyExpireToken;
