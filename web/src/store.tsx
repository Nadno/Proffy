import React, { createContext, useState, useEffect } from "react";
import {
  setAccount,
  setToken,
  setRefreshToken,
  getAccount,
  getToken,
  getRefreshToken,
} from "./Utils/account";

interface IAccount {
  id: number;
  email: string;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface IUser {
  account: IAccount;
  token: string | null;
  refreshToken: string | null;
}

interface IProps {
  user: IUser;
  handleLogin: Function;
}

const Context = createContext<IProps | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>({
    account: {
      id: 0,
      email: "",
      name: "",
      avatar: "",
      whatsapp: "",
      bio: "",
    },
    token: null,
    refreshToken: null,
  });

  useEffect(() => getAccountFromCookie(), []);

  function getAccountFromCookie() {
    const account = getAccount();
    const token = getToken();
    const refreshToken = getRefreshToken();

    if (account && token && refreshToken) {
      setUser({
        account,
        token,
        refreshToken,
      });
    }
  }

  const handleLogin = (data: IUser) => {
    const account = data.account ? data.account : null;
    const token = data.token ? data.token : null;
    const refreshToken = data.refreshToken ? data.refreshToken : null;

    if (!account || !token || !refreshToken) return null;

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
    <Context.Provider value={{ user, handleLogin }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };
