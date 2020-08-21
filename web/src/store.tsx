import React, { createContext, useState, useEffect } from "react";
import { setAccount, setToken, setRefreshToken, getAccount, getToken, getRefreshToken } from "./Utils/account";

interface IAccount {
  message?: string;
  account: object;
  token: string;
  refreshToken: string;
}

interface IProps {
  user: IAccount;
  handleLogin: Function;
}

const Context = createContext<IProps | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({
    account: {},
    token: "",
    refreshToken: "",
  });

  useEffect(() => getAccountFromCookie(), []);

  function getAccountFromCookie() {
    const account = getAccount();
    const token = getToken();
    const refreshToken = getRefreshToken();
    
    if(account) {
      setUser({
        account,
        token,
        refreshToken,
      });

      console.log(token);
    };
  };

  const handleLogin = ({account, token, refreshToken}: IAccount) => {
    setUser({
      account,
      token,
      refreshToken,
    });

    setAccount(account);
    setToken(token);
    setRefreshToken(refreshToken);
  };

  return (
    <Context.Provider value={{user, handleLogin}}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };
